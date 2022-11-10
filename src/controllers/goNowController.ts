import AmigosModel from '../models/amigos';
import GoNowPairModel from '../models/goNow';
import { getDistanceInKm } from '../utils/getDistanceInKm';
import { sendGoNowRequestNotification } from './notificationsController';

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
    const possiblePairsIds = [];
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
        possiblePairsIds.push(possiblePairs[i]._id);
      }
    }
    //console.log(distanceFilter);
    if (distanceFilter.length === 0) {
      res.status(200).json({ message: 'No possible pairs were found' });
    } else {
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
      console.log('Go Now Document saved in DB: ', goNowPair);
      sendGoNowRequestNotification(
        currentUserId,
        possiblePairsIds,
        'goNowRequest',
      );
      res.status(200).json({ message: 'Go Now Pair created' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { newGoNowPair };

