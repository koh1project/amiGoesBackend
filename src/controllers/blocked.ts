import Blocked from '../models/blocked';
import ConnectionsModel from '../models/connections';

// controller to block user
const blockUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const blockedUserId = req.params.blockedUserId;
    // console.log(userId);
    // console.log(blockedUserId);
    const newBlocked = new Blocked({
      userID: userId,
      blockedUserID: blockedUserId,
    });
    await newBlocked.save();

    const removeConnectedUser = await ConnectionsModel.updateMany(
      {
        $and: [
          {
            $or: [{ userID1: userId }, { userID2: userId }],
          },
          {
            $or: [{ userID1: blockedUserId }, { userID2: blockedUserId }],
          },
        ],
      },
      { $set: { isConnected: false } },
    );

    res.status(200).json({ removeConnectedUser, message: 'User blocked' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controller for getting blocked users
const getBlockedUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const blockedUsers = await Blocked.find({ userID: userId }).populate([
      'blockedUserID',
    ]);
    res.status(200).json({ blockedUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { blockUser, getBlockedUsers };
