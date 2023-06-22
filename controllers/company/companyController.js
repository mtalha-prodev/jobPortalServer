export const companyRegister = async () => {
  try {
    const { email, name } = req.body;

    console.log(email, name);

    res.status(200).json({ email: email, name: name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
