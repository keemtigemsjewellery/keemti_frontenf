import * as Yup from "yup";

export const addNewAddressSchema = Yup.object<any>().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(3, "Full Name should be a minimum of 10 characters"),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .min(10, "Mobile number should be a minimum of 10 characters")
    .matches(
      /^[0-9]{1,10}$/,
      "Mobile number should be numeric and have a maximum length of 10 digits"
    ),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[1-9][0-9]{5}$/, "Pincode is invalid"),
  locality: Yup.string().required("Locality is required"),
  streetaddress: Yup.string().required("Street address is required"),
  landmark: Yup.string(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  primary: Yup.boolean(),
});

export const profileValidationSchema = Yup.object<any>().shape({
  title: Yup.string().required("Title is required"),
  fullName: Yup.string().required("Full Name is required"),
  countryCode: Yup.string(),
  dateOfBirth: Yup.mixed().required("Date of Birth is required"),
  anniversaryDate: Yup.mixed(),
  spouseBirthdayDate: Yup.mixed(),
  mobileNo: Yup.mixed(),
  profileImage: Yup.mixed(),
  email: Yup.string(),
});
