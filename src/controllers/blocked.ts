import Blocked from '../models/blocked';

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

const getBlockedUsers = async (req, res) => {
  try {
    const { userID } = req.body;
    const blockedUsers = await Blocked.find({ userID });
    res.status(200).json({ blockedUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { blockUser, getBlockedUsers };

