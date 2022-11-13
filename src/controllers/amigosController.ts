import AmigosModel from '../models/amigos';

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
    console.log(profile);
    // update age if birthday has passed since last update
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

// view user profile
const viewUserProfile = async (req, res) => {
  res.status(200).json({ message: 'View user profile' });
};

export {
  createProfile,
  getUserProfile,
  updateProfile,
  deleteProfile,
  viewUserProfile,
};

