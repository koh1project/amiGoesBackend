import AmigosModel from '../models/amigos';
import { getDistanceInKm } from '../utils/getDistanceInKm';
//import { sendNotification } from './notificationsController';
import GoNowPairModel from '../models/goNow';

const newGoNowPair = async (req, res) => {
  try {
    const currentUserId = req.params.userId;
    const liveLocation = req.body.liveLocation;
    const distance = req.body.distance;
    const currentUserInfo = await AmigosModel.findById(req.params.userId);

    const possiblePairs = await AmigosModel.find({
      _id: { $ne: currentUserId },
      languages: { $in: currentUserInfo.languages },
      gender: { $in: currentUserInfo.connectPreferences.gender },
      age: {
        $gte: currentUserInfo.connectPreferences.minAge,
        $lte: currentUserInfo.connectPreferences.maxAge,
      },
      'connectPreferences.isInvisible': false,
    });
    const distanceFilter = [];
    for (let i = 0; i < possiblePairs.length; i++) {
      const latitude1 = liveLocation.latitude;
      const longitude1 = liveLocation.longitude;
      const latitude2 =
        possiblePairs[i].connectPreferences.currentLocation.latitude;
      const longitude2 =
        possiblePairs[i].connectPreferences.currentLocation.longitude;
      const distanceInKm = getDistanceInKm(
        latitude1,
        longitude1,
        latitude2,
        longitude2,
      );
      if (distanceInKm <= distance) {
        distanceFilter.push({
          pairUserId: possiblePairs[i]._id,
          accepted: false,
        });
      }
    }
    console.log(distanceFilter);

    const goNowPair = new GoNowPairModel({
      userId: currentUserId,
      location: liveLocation,
      goTo: req.body.goTo,
      possiblePairs: distanceFilter,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await goNowPair.save();
    console.log(goNowPair);
    res.status(200).json({ message: 'Go Now Pair created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { newGoNowPair };
