import AmigosModel from '../models/amigos';

const updateNotificationToken = async (req, res) => {
  try {
    const { userId } = req.params;
    const { notificationsToken } = req.body;
    console.log('userId: ', userId);
    console.log('NotificationsToken: ', notificationsToken);
    await AmigosModel.updateOne(
      { _id: userId },
      {
        $set: {
          notificationsToken,
        },
      },
    );
    res.status(200).json({ message: 'Notification token updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { updateNotificationToken };

