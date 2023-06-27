import Company from "../../model/company/companySchema.js";

// get all company users show in dashboard

// url api/v1/admin/companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    if (!companies) {
      return res
        .status(404)
        .json({ status: false, message: "Users not found!" });
    }

    return res.status(200).json({
      status: true,
      message: "Get all Company Success!",
      companies: companies,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// company user delete account throw admin
export const companyUserDelete = async (req, res) => {
  try {
    const { _id } = req.params;
    // console.log(_id);

    const user = await Company.findByIdAndDelete(_id);

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "user not found!" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Company Delete successfully !", user });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// company user update details throw admin
export const companyUserUpdate = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);

    let user = await Company.findById(_id);
    console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "company not found!" });
    }
    user = await Company.findByIdAndUpdate(_id, req.body, { new: true });

    return res
      .status(200)
      .json({ status: true, message: "Company update successfully !", user });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
