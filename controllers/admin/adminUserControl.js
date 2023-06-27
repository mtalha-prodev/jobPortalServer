import Users from "../../model/jobSekeer/userSchema.js";

// get admin all users show in dashboard
// url api/v1/admin/users

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    if (!users) {
      return res
        .status(404)
        .json({ status: false, message: "User not found!" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Get all User Success!", users: users });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// delete user from account by admin
export const userDelete = async (req, res) => {
  try {
    const { _id } = req.params;

    console.log(_id);

    const user = await Users.findByIdAndDelete(_id);

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "user not found!" });
    }

    return res
      .status(200)
      .json({ status: true, message: "User Delete successfully !", user });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// user update account details by admin
export const userUpdate = async (req, res) => {
  try {
    const { _id } = req.params;

    let user = await Users.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "user not found!" });
    }

    user = await Users.findByIdAndUpdate(_id, req.body, { new: true });

    return res
      .status(200)
      .json({ status: true, message: "User Update successfully !", user });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
