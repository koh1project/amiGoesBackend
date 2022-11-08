import { Expo } from 'expo-server-sdk';
import AmigosModel from '../models/amigos';
import NotificationModel from '../models/notifications';

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

const sendNotification = async (
  userId1: string,
  userId2: string,
  notificationType: string,
) => {
  const expo = new Expo();
  try {
    const senderId = userId1;
    const receiverId = userId2;
    const type = notificationType;
    const senderUserInfo = await AmigosModel.findOne({ _id: senderId });
    const senderUserName = senderUserInfo.name;
    const receiverUserInfo = await AmigosModel.findOne({ _id: receiverId });
    const receiverNotificationsToken = receiverUserInfo.notificationsToken;

    if (!Expo.isExpoPushToken(receiverNotificationsToken)) {
      console.error(
        `Push token ${receiverNotificationsToken} is not a valid Expo push token`,
      );
      return;
    }
    if (type === 'Connect Request') {
      let ticket = {};
      try {
        ticket = await expo.sendPushNotificationsAsync([
          {
            to: receiverNotificationsToken,
            sound: 'default',
            body: `${senderUserName} has sent you a connect request`,
          },
        ]);
        const newNotification = new NotificationModel({
          sender: senderId,
          receiver: receiverId,
          notificationType: type,
          isRead: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await newNotification.save();
        console.log('NotificationTicket: ', ticket);
      } catch (err) {
        console.error(err);
      }
    }
    if (type === 'Connect Accepted') {
      let ticket = {};
      try {
        ticket = await expo.sendPushNotificationsAsync([
          {
            to: receiverNotificationsToken,
            sound: 'default',
            body: `${senderUserName} accepted your connect request`,
          },
        ]);
        const newNotification = new NotificationModel({
          sender: senderId,
          receiver: receiverId,
          notificationType: type,
          isRead: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await newNotification.save();
        console.log('NotificationTicket: ', ticket);
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export { updateNotificationToken, sendNotification };

