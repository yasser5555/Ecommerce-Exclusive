const profileService = require("./profile.service");

// GET /api/profile
const getProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getProfile(req.user.id);
    res.status(200).json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ error: `error at profile.Controller.getProfile ${error}` });
  }
};

// PUT /api/profile

const updateProfile = async (req, res, next) => {
  try {
    const profile = await profileService.updateProfile(req.user.id, req.body);
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: profile });
  } catch (error) {
    res
      .status(500)
      .json({ error: `error at profile.Controller.updateProfile ${error}` });
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const profile = await profileService.updateAvatar(req.user.id, req.file);
    res
      .status(200)
      .json({ message: "Avatar updated successfully", user: profile });
  } catch (error) {
    res
      .status(500)
      .json({ error: `error at profile.Controller.updateAvatar ${error}` });
  }
};
const uploadAvatar = async (req, res, next) => {
  const avatar = `uploads/avatars/${req.file.filename}`;
  try {
    const profile = await profileService.uploadAvatar(req.user.id, avatar);
    res
      .status(200)
      .json({ message: "Avatar updated successfully", user: profile });
  } catch (error) {
    res
      .status(500)
      .json({ error: `error at profile.Controller.uploadAvatar ${error}` });
  }
};
const GetProfileData = async (req, res) => {
  try {
    const Profile_data = await profileService.GetProfileData(req.user.id);
    res.status(200).json(Profile_data);
  } catch (error) {
    res
      .status(500)
      .json({ error: `error at profile.Controller.GetProfileData ${error}` });
  }
};
const GetUserCards = async (req, res) => {
  try {
    const user_cards = await profileService.GetUserCards(req.user.id);
    res.status(200).json(user_cards);
  } catch (error) {
    res
      .status(500)
      .json({ error: `error at profile.Controller.GetUserCards ${error}` });
  }
};

const AddUserCards = async (req, res) => {
  try {
    const user_card = await profileService.AddUsercards(req.user.id, req.body);
    if (!user_card) {
      throw new Error(`Error====>${user_card}`);
    }
    res.status(201).json({ msg: "Card Added Successfully ✅✅", user_card });
  } catch (error) {
    res
      .status(500)
      .json({ error: `error at profile.Controller.AddUserCards ${error}` });
  }
};

const DeleteUserCard = async (req, res) => {
  try {
    const user_cards = await profileService.DeleteUsercard(req.user.id);
    res.status(200).json({ msg: "Card Deleted Successfully✅✅" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `error at profile.Controller.GetUserCards ${error}` });
  }
};

const GetUserAddresses = async (req, res) => {
  try {
    const user_address = await profileService.Get_User_Addresses(req.user.id);
    res.status(200).json(user_address);
  } catch (error) {
    res
      .status(500)
      .json({ error: `error at profile.Controller.GetUserAddresses ${error}` });
  }
};

const add_User_Address = async (req, res) => {
  try {
    const Added_address = await profileService.add_User_Address(
      req.user.id,
      req.body,
    );
    if (!Added_address) {
      throw new Error(`Error====>${Added_address}`);
    }
    res
      .status(201)
      .json({ msg: "Address Added Successfully ✅✅", Added_address });
  } catch (error) {
    res
      .status(500)
      .json({ error: `error at profile.Controller.AddUserCards ${error}` });
  }
};

const delete_User_Address = async (req, res) => {
  try {
    const Deleted_Address = await profileService.delete_User_Address(
      req.user.id,
    );

    res
      .status(200)
      .json({ msg: "Address Deleted Successfully✅✅", Deleted_Address });
  } catch (error) {
    res
      .status(500)
      .json({
        error: `error at profile.Controller.delete_User_Address ${error}`,
      });
  }
};

const get_User_Orders = async (req, res) => {
  try {
    const user_orders = await profileService.get_User_Orders(req.user.id);
    res.status(200).json({ user_orders:user_orders });
  } catch (error) {
    res
      .status(500)
      .json({ error: `error at profile.Controller.get_User_Orders ${error}` });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  updateAvatar,
  GetProfileData,
  GetUserCards,
  AddUserCards,
  DeleteUserCard,
  GetUserAddresses,
  add_User_Address,
  delete_User_Address,
  get_User_Orders,
};
