export const sendToken = async (res, user, statusCode, message) => {
  try {
    console.log(user)
    const token = user.getJwtToken();
// const token = ''
    console.log(token);

    const options = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
    };

    res
      .status(statusCode)
      .cookie("token", token, options)
      .json({ status: true, message: message, user: user});
  } catch (error) {
    res.status(500).json({ status: false, message: error});
  }
};
