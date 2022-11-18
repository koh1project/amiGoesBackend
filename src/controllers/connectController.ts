import AmigosModel from '../models/amigos';
import ConnectionsModel from '../models/connections';
import { getDistanceInKm } from '../utils/getDistanceInKm';
import { sendNotification } from './notificationsController';

// controller for getting users based on connect preferences
const connectFeed = async (req, res) => {
  try {
    const currentUserInfo = await AmigosModel.findById(req.params.userId);

    if (!currentUserInfo) {
      return res
        .status(404)
        .json({ Error: `User with id ${req.params.userId} not found` });
    }

    const amigoes = await AmigosModel.find({});
    return res.json(amigoes);
    const feedResult = await AmigosModel.find({
      _id: { $ne: currentUserInfo._id },
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
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getPendingRequest = async (req, res) => {
  const pendingRequest = await ConnectionsModel.find({
    userID1: req.params.userId,
    isConnected: false,
    isPending: true,
  }).populate(['userID1', 'userID2']);
  res.json(pendingRequest);
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

// controller for new connection request
const newConnectionRequest = async (req, res) => {
  try {
    const userId1 = req.params.userId;
    const userId2 = req.body.targetUserId;
    //console.log(`userId1: ${userId1} ... userId2: ${userId2}`);
    const connection = new ConnectionsModel({
      userID1: userId1,
      userID2: userId2,
      isConnected: false,
      isPending: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await connection.save();
    sendNotification(userId1, userId2, 'ConnectRequest');
    res.status(200).json({ message: 'Connection Request Sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controller for accepting connection request
const acceptConnectionRequest = async (req, res) => {
  try {
    const userId1 = req.params.userId;
    const userId2 = req.body.targetUserId;
    console.log(`userId1: ${userId1} ... userId2: ${userId2}`);
    await ConnectionsModel.updateOne(
      { userID1: userId2, userID2: userId1 },
      {
        $set: {
          isConnected: true,
          isPending: false,
          updatedAt: new Date(),
        },
      },
    );
    sendNotification(userId1, userId2, 'ConnectAccepted');
    res.status(200).json({ message: 'Connection Request Accepted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controller for getting connected users
const getConnectedUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const connectedUsers = await ConnectionsModel.find({
      $or: [{ userID1: userId }, { userID2: userId }],
      isConnected: true,
      isPending: false,
    }).populate(['userID1', 'userID2']);

    res.status(200).json({ connectedUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  connectFeed,
  updateConnectPreferences,
  getConnectedUsers,
  newConnectionRequest,
  acceptConnectionRequest,
};
