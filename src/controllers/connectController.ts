import AmigosModel from '../models/amigos';
import Connections from '../models/connections';

// function to calculate distance between two locations
function getDistanceInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInKm = R * c; // Distance in km
  return distanceInKm;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// controller for getting users based on connect preferences
const connectFeed = async (req, res) => {
  try {
    const currentUserInfo = await AmigosModel.findById(req.params.userId);

    const feedResult = await AmigosModel.find({
      _id: { $ne: req.params.userId },
      languages: { $in: currentUserInfo.languages },
      gender: { $in: currentUserInfo.connectPreferences.gender },
      age: {
        $gte: currentUserInfo.connectPreferences.minAge,
        $lte: currentUserInfo.connectPreferences.maxAge,
      },
      'connectPreferences.isInvisible': false,
      'connectPreferences.activities': {
        $in: currentUserInfo.connectPreferences.activities,
      },
      'connectPreferences.fromDate': {
        $lte: currentUserInfo.connectPreferences.toDate,
      },
      'connectPreferences.toDate': {
        $gte: currentUserInfo.connectPreferences.fromDate,
      },
      'connectPreferences.fromTime': {
        $lte: currentUserInfo.connectPreferences.toTime,
      },
      'connectPreferences.toTime': {
        $gte: currentUserInfo.connectPreferences.fromTime,
      },
    });
    //console.log(feedResult.length);
    const distanceFilter = [];
    for (let i = 0; i < feedResult.length; i++) {
      const latitude1 =
        currentUserInfo.connectPreferences.currentLocation.latitude;
      const longitude1 =
        currentUserInfo.connectPreferences.currentLocation.longitude;
      const latitude2 =
        feedResult[i].connectPreferences.currentLocation.latitude;
      const longitude2 =
        feedResult[i].connectPreferences.currentLocation.longitude;
      const distanceInKm = getDistanceInKm(
        latitude1,
        longitude1,
        latitude2,
        longitude2,
      );
      //console.log(distanceInKm);
      if (distanceInKm <= currentUserInfo.connectPreferences.locationDistance) {
        distanceFilter.push(feedResult[i]);
      }
    }
    console.log(distanceFilter);
    res.status(200).json(distanceFilter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controller for updating connect preferences
const updateConnectPreferences = async (req, res) => {
  try {
    const uid = req.params.userId;
    const { connectPreferences } = req.body;
    await AmigosModel.updateOne(
      { _id: uid },
      {
        $set: {
          connectPreferences,
        },
      },
    );
    res.status(200).json({ message: 'Connect Preferences updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getConnectedUsers = async (req, res) => {
  try {
    const { userID1 } = req.body;
    const connectedUsers = await Connections.find({ userID1 });
    res.status(200).json({ connectedUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { connectFeed, updateConnectPreferences, getConnectedUsers };
