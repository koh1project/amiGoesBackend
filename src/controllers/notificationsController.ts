import AmigosModel from '../models/amigos';

const updateNotificationToken = async (req, res) => {
  try {
    const { userId } = req.params;
    const { notificationToken } = req.body;
    await AmigosModel.updateOne(
      { _id: userId },
      {
        $set: {
          notificationToken,
        },
      },
    );
    res.status(200).json({ message: 'Notification token updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { updateNotificationToken };
