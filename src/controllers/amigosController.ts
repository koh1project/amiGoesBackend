import { Request, Response } from 'express';
import AmigosModel from '../models/amigos';
import ConnectionsModel from '../models/connections';
import { getDistanceInKm } from '../utils/getDistanceInKm';

const createProfile = async (req, res) => {
  try {
    const dob = new Date(req.body.birthday);
    const month = dob.getMonth();
    const day = dob.getDate();
    const today = new Date();
    let calculateAge = new Date().getFullYear() - new Date(dob).getFullYear();
    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      calculateAge--;
    }
    const {
      _id,
      name,
      homeCountry,
      languages,
      gender,
      birthday,
      bio,
      profilePicture,
      isVerified,
      hobbies,
      favorites,
      contact,
      emergencyContact,
      connectPreferences,
      notificationsOn,
      createdAt,
      updatedAt,
    } = req.body;
    const newAmigos = new AmigosModel({
      _id,
      name,
      homeCountry,
      languages,
      gender,
      birthday,
      age: calculateAge,
      bio,
      profilePicture,
      isVerified,
      hobbies,
      favorites,
      contact,
      emergencyContact,
      connectPreferences,
      notificationsOn,
      createdAt,
      updatedAt,
    });
    await newAmigos.save();
    res.status(200).json({ message: 'Profile created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get user profile information from database
const getUserProfile = async (req, res) => {
  try {
    const profile = await AmigosModel.findById(req.params.userId);
    //console.log(profile);
    // update age if birthday has passed since last update
    const dob = new Date(profile.birthday);
    const month = dob.getMonth();
    const day = dob.getDate();
    const today = new Date();
    let calculateAge = new Date().getFullYear() - new Date(dob).getFullYear();
    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      calculateAge--;
    }
    if (profile.age !== calculateAge) {
      await AmigosModel.updateOne(
        { _id: req.params.userId },
        {
          $set: {
            age: calculateAge,
          },
        },
      );
    }
    const profileData = profile.toJSON();
    console.log(profileData);
    res.status(200).json(profileData);
    //res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update user profile information in database
const updateProfile = async (req, res) => {
  try {
    const uid = req.params.userId;
    const {
      name,
      homeCountry,
      languages,
      gender,
      bio,
      profilePicture,
      hobbies,
      contact,
    } = req.body;
    await AmigosModel.updateOne(
      { _id: uid },
      {
        $set: {
          name,
          homeCountry,
          languages,
          gender,
          bio,
          profilePicture,
          hobbies,
          contact,
          updatedAt: new Date(),
        },
      },
    );
    res.status(200).json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete user profile information from database
const deleteProfile = async (req, res) => {
  try {
    const uid = req.params.userId;
    await AmigosModel.deleteOne({ _id: uid });
    res.status(200).json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// view not connected user profile
const viewUserProfile = async (req, res) => {
  try {
    const currentUserId = req.params.userId;
    const targetUserId = req.body.targetUserId;
    const targetUser = await AmigosModel.findById(targetUserId);
    const connection = await ConnectionsModel.find({
      $and: [
        { $or: [{ userID1: currentUserId }, { userID2: currentUserId }] },
        { $or: [{ userID1: targetUserId }, { userID2: targetUserId }] },
      ],
    });

    const data = {
      userId: targetUser._id,
      name: targetUser.name,
      homeCountry: targetUser.homeCountry,
      languages: targetUser.languages,
      gender: targetUser.gender,
      age: targetUser.age,
      bio: targetUser.bio,
      hobbies: targetUser.hobbies,
    };

    if (connection.length === 1) {
      if (
        connection[0].isConnected === false &&
        connection[0].isPending === true
      ) {
        res.status(200).json({ message: 'connection is pending', data });
      }
      if (connection[0].isConnected === true) {
        const connectedAmigoData = {
          userId: targetUser._id,
          name: targetUser.name,
          homeCountry: targetUser.homeCountry,
          languages: targetUser.languages,
          gender: targetUser.gender,
          age: targetUser.age,
          bio: targetUser.bio,
          profilePicture: targetUser.profilePicture,
          hobbies: targetUser.hobbies,
          contact: targetUser.contact,
          emergencyContact: targetUser.emergencyContact,
          connectedOn: connection[0].updatedAt,
        };
        res.status(200).json(connectedAmigoData);
      }
    } else {
      res.status(200).json({ message: 'No connection request', data });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUserLocation = async (req: Request, res: Response) => {
  const amigoUser = await AmigosModel.findById(req.params.userId);
  if (amigoUser) {
    const location = req.body.location;
    amigoUser.connectPreferences.currentLocation = {
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    };
    await amigoUser.save();
    res.json({ status: 'ok' });
  }
};

const getAmigosFromLocation = async (req: Request, res: Response) => {
  const amigoUsers = await AmigosModel.find({
    _id: { $ne: req.params.userId },
  });
  const { location, distance } = req.body;
  if (!location) return res.json([]);
  const filteredAmigoes = amigoUsers.filter((amigo) => {
    const { latitude, longitude } = amigo.connectPreferences.currentLocation;
    // eslint-disable-next-line no-empty
    if (latitude && longitude) {
      const userDistance = getDistanceInKm(
        latitude,
        longitude,
        location.coords.latitude,
        location.coords.longitude,
      );
      console.log({ latitude, longitude, userDistance });
      if (userDistance <= distance) return true;
    }
    return false;
  });

  res.json(
    filteredAmigoes.filter((amigo) => {
      return (
        amigo.connectPreferences.currentLocation?.latitude &&
        amigo.connectPreferences.currentLocation?.longitude
      );
    }),
  );
};
export {
  createProfile,
  getUserProfile,
  updateProfile,
  deleteProfile,
  viewUserProfile,
  updateUserLocation,
  getAmigosFromLocation,
};
