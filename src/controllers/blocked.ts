import Blocked from '../models/blocked';

// controller to block user
const blockUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const blockedUserId = req.params.blockedUserId;
    console.log(userId);
    console.log(blockedUserId);
    const newBlocked = new Blocked({
      userID: userId,
      blockedUserID: blockedUserId,
    });
    await newBlocked.save();
    res.status(200).json({ message: 'User blocked' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controller for getting blocked users
const getBlockedUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const blockedUsers = await Blocked.find({ userID: userId });
    res.status(200).json({ blockedUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { blockUser, getBlockedUsers };
