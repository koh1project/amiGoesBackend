import Blocked from '../models/blocked';

// controller to block user
const blockUser = async (req, res) => {
  try {
    console.log(req.body);
    const { userID, blockedUserID } = req.body;
    const newBlocked = new Blocked({
      userID,
      blockedUserID,
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
    const blockedUsers = await Blocked.find({ userId });
    res.status(200).json({ blockedUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { blockUser, getBlockedUsers };
