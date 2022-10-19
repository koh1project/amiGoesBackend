import AmigosModel from '../models/amigos';

const createProfile = async (req, res) => {
  try {
    console.log(req.body);
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
    console.log(profile);
    res.status(200).json(profile);
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
    await AmigosModel.updateOne(
      { _id: uid },
      {
        $set: {
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
        },
      },
    );
    res.status(200).json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createProfile, getUserProfile, updateProfile };

