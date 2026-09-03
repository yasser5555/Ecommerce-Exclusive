const profileRepository = require("./profile.repository");
// Get current user profile
const getProfile = async (userId) => {
  try {
    const user = await profileRepository.getProfileById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    const Error = {};
    Error.error = `Error at profile.service.getProfile ===> ${error}`;
    return Error;
  }
};

// Update profile
const updateProfile = async (userId, data) => {
  try {
    await profileRepository.updateProfile(
      userId,
      data.first_name,
      data.last_name,
      data.phone_number,
      data.email,
    );

    return await profileRepository.getProfileById(userId);
  } catch (error) {
    const Error = {};
    Error.error = `Error at profile.service.updateProfile ===> ${error}`;
    return Error;
  }
};

// Update avatar
const updateAvatar = async (userId, file) => {
  try {
    if (!file) {
      throw new Error("Please select an image");
    }
    const avatarPath = `server/src/uploads/avatars/${file.filename}`;
    await profileRepository.updateAvatar(userId, avatarPath);
    return await profileRepository.getProfileById(userId);
  } catch (error) {
    const Error = {};
    Error.error = `Error at profile.service.updateAvatar ===> ${error}`;
    return Error;
  }
};

// Upload avatar
const uploadAvatar = async (userId, file) => {
  try {
    if (!file) {
      throw new Error("Please select an image");
    }
    const avatarPath = `${file}`;
    await profileRepository.uploadAvatar(userId, avatarPath);
    return await profileRepository.getProfileById(userId);
  } catch (error) {
    const Error = {};
    Error.error = `Error at profile.service.uploadAvatar ===> ${error}`;
    return Error;
  }
};

const GetProfileData = async (user_id) => {
  try {
    const userOrders = await profileRepository.GetProfileData(user_id);
    if (!userOrders) {
      throw new Error("No Orders Found :)");
    }
    return userOrders;
  } catch (error) {
    const Error = {};
    Error.error = `Error at profile.service.GetUserOrders ===> ${error}`;
    return Error;
  }
};

const GetUserCards = async (user_id) => {
  try {
    const userCards = await profileRepository.GetUserCards(user_id);
    if (!userCards) {
      throw new Error("No Cards Found :)");
    }
    return userCards;
  } catch (error) {
    throw new Error(`Error at profile.service.GetUserCards ===> ${error}`);
  }
};

const AddUsercards = async (user_id, data) => {
  try {
    const userCards = await profileRepository.Add_userCard(
      user_id,
      data.card_type,
      data.bank_name,
      data.last4,
      data.balance,
      data.expiry_day,
      data.expiry_month,
      data.expiry_year,
    );

    return userCards;
  } catch (error) {
    throw new Error(`Error at profile.service.AdduserCard ===> ${error}`);
  }
};

const DeleteUsercard = async (userId) => {
  try {
    const user = await profileRepository.DeleteUserCard(userId);
    return user;
  } catch (error) {
    const Error = {};
    Error.error = `Error at profile.service.DeleteUsercard ===> ${error}`;
    return Error;
  }
};

const Get_User_Addresses = async (user_id) => {
  try {
    const user_address = await profileRepository.GetUserAddresses(user_id);
    if (!user_address) {
      throw new Error("No Address Found :)");
    }
    return user_address;
  } catch (error) {
    throw new Error(`Error at profile.service.Get_User_Addresses ===> ${error}`);
  }
};


const add_User_Address = async (user_id,data) => {
  try {
    const user_address = await profileRepository.addUserAddress(
      user_id,
      data.country,
      data.city,
      data.street_number,
      data.building_number,
      data.apartement_number,
    );
    return user_address;
  } catch (error) {
    throw new Error(`Error at profile.service.add_user_address ===> ${error}`);
  }
};

const delete_User_Address = async (user_id) => {
  try {
    const Deleted_Address = await profileRepository.deleteUserAddress(user_id);
    return Deleted_Address;
  } catch (error) {
    throw new Error(
      `Error at profile.service.delete_User_Address ===> ${error}`,
    );
  }
};

const get_User_Orders = async (user_id) => {
  try {
    const user_orders = await profileRepository.getUserOrders(user_id);
    return user_orders;
  } catch (error) {
    throw new Error(`Error at profile.service.get_User_Orders ===> ${error}`);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  updateAvatar,
  GetProfileData,
  GetUserCards,
  AddUsercards,
  DeleteUsercard,
  Get_User_Addresses,
  add_User_Address,
  delete_User_Address,
  get_User_Orders,
};
