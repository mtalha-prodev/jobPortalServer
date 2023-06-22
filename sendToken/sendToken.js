export const sendToken = async (res, user, statusCode, message) => {
  try {
    const token = user.getJwtToken();

    // console.log(token);

    const options = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
    };

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      role: user.role,
    };

    res
      .status(statusCode)
      .cookie("token", token, options)
      .json({ status: true, message: message, user: userData });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
