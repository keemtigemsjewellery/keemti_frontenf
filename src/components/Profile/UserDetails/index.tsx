import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";

import { profileDetailsModel } from "utils/interface/Profile";
import { profileValidationSchema } from "utils/validationSchema/Profile";

import ProfileIcon from "../../../assets/images/icons/account-icon1-black.svg";
import { useEffect, useState } from "react";
import EmailPopup from "./EmailPopout";
import MobilePopup from "./MobilePopout";
import {
  getProfileDetailsAPI,
  updateProfileAPI,
} from "utils/api/service/profileServices";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetailsAction,
  getUserDetailsData,
  setUserDetailsAction,
} from "store/slices/profileSlice";
import { ColorRing } from "react-loader-spinner";
import { SuccessSweetAlert } from "utils/hooks/SweetAlert";

const UserDetails = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector(getUserDetailsData);

  const [serverImage, setServerImage] = useState<any>("");
  const [imageFile, setImageFile] = useState<any>();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [spinningLoader, setSpinningLoader] = useState(false);

  useEffect(() => {
    if (userDetails) {
      userDetails?.title && setValue("title", userDetails?.title);
      userDetails?.fullName && setValue("fullName", userDetails?.fullName);
      userDetails?.countryCode && setValue("countryCode", "+91");
      userDetails?.dateOfBirth &&
        setValue("dateOfBirth", userDetails?.dateOfBirth.substring(0, 10));
      userDetails?.spouseBirthdayDate &&
        setValue(
          "spouseBirthdayDate",
          userDetails?.spouseBirthdayDate.substring(0, 10)
        );
      userDetails?.mobileNo && setValue("mobileNo", userDetails?.mobileNo);
      userDetails?.anniversaryDate &&
        setValue(
          "anniversaryDate",
          userDetails?.anniversaryDate.substring(0, 10)
        );
      userDetails?.profileImage && setServerImage(userDetails?.profileImage);
      userDetails?.fullName && setValue("email", userDetails?.email);
    }
  }, [userDetails]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<profileDetailsModel>({
    resolver: yupResolver(profileValidationSchema),
  });

  const onSubmit: SubmitHandler<profileDetailsModel> = async (
    data: profileDetailsModel
  ) => {
    const profileData = new FormData();
    profileData.append("title", data?.title ?? "");
    profileData.append("fullName", data?.fullName ?? "");
    profileData.append("countryCode", "+91");
    profileData.append("dateOfBirth", (data?.dateOfBirth as any) ?? "");
    profileData.append("anniversaryDate", (data?.anniversaryDate as any) ?? "");
    profileData.append(
      "spouseBirthdayDate",
      (data?.spouseBirthdayDate as any) ?? ""
    );
    profileData.append("mobileNo", (data?.mobileNo as any) ?? "");
    profileData.append(
      "profileImage",
      imageFile !== undefined ? imageFile : serverImage ?? ""
    );
    profileData.append("email", data?.email ?? "");

    try {
      setSpinningLoader(true);
      const updatedData = await updateProfileAPI(profileData);
      dispatch(setUserDetailsAction(updatedData?.data?.data));
      setSpinningLoader(false);

      SuccessSweetAlert({
        title: "Profile details updated successfully !!",
        timer: 2000,
      });

      const { data } = await getProfileDetailsAPI();
      dispatch(getUserDetailsAction(data.data));
    } catch {
      console.log("Unable to login");
    }
  };

  const profileImageHandler = (e: any) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <>
      <div className="col-md-12 col-lg-8 col-xl-9">
        <div className="accountpage-right white-bg white-boxbg">
          <div className="head">
            <h6>Account Detail</h6>
          </div>
          <div className="accountpage-form form">
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group col-md-6">
                <div className="user_image">
                  <div className="image-upload">
                    <img 
                      src={
                        imageFile !== undefined
                          ? URL.createObjectURL(imageFile)
                          : serverImage !== "" && serverImage !== null
                          ? serverImage
                          : ProfileIcon
                      }
                      alt="user"
                    />
                    <div className="image-upload">
                      <label htmlFor="file-input">
                        <i className="fal fa-edit"></i>
                      </label>
                      <input
                        id="file-input"
                        type="file"
                        onChange={(e) => profileImageHandler(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group col-md-6">
                <Controller
                  name="title"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="form-group col-md-12">
                      <label>Title</label>
                      <select
                        className="form-control"
                        value={value}
                        onChange={onChange}
                      >
                        <option value="">Select title</option>
                        <option>Mister (Mr)</option>
                        <option>Miss (Ms)</option>
                        <option>Missus (Mrs)</option>
                      </select>

                      {errors?.title !== undefined && (
                        <p className="text-danger text-start mt-2">
                          {errors?.title?.message as string}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="fullName"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="form-group col-md-12">
                      <label>Full name</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Full name"
                        value={
                          value === null || value === undefined ? "" : value
                        }
                        onChange={onChange}
                      />
                      {errors?.fullName !== undefined && (
                        <p className="text-danger text-start mt-2">
                          {errors?.fullName?.message as string}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <Controller
                name="mobileNo"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <div className="contact-group form-group col-md-6 modal-btn-wrapper">
                      <span className="input-group-text profile-details">
                        <label>Mobile Number</label>
                        <span>+91</span>
                      </span>
                      <input
                        type="text"
                        className="form-control disable"
                        placeholder="Mobile number"
                        disabled
                        value={
                          value === null || value === undefined ? "" : value
                        }
                        onChange={onChange}
                      />
                      <a
                        href="#"
                        className="change-modal-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#changenumber"
                        onClick={() => setIsPopupOpen(!isPopupOpen)}
                      >
                        Update
                      </a>
                      {errors?.mobileNo !== undefined && (
                        <p className="text-danger text-start mt-2">
                          {errors?.mobileNo?.message as string}
                        </p>
                      )}
                    </div>
                  </>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <div className="form-group col-md-6 modal-btn-wrapper">
                      <label>Email</label>
                      <input
                        className="form-control disable"
                        type="email"
                        placeholder="Email"
                        value={
                          value === null || value === undefined ? "" : value
                        }
                        disabled
                      />
                      <a
                        className="change-modal-btn pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => setIsPopupOpen(!isPopupOpen)}
                      >
                        Update
                      </a>
                      {errors?.email !== undefined && (
                        <p className="text-danger text-start mt-2">
                          {errors?.email?.message as string}
                        </p>
                      )}
                    </div>
                  </>
                )}
              />

              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <div className="form-group col-md-6 dob-profile-details">
                      <label>Date of Birth </label>
                      <input
                        className="form-control"
                        type="date"
                        value={
                          value === null || value === undefined
                            ? ("" as any)
                            : value
                        }
                        onChange={onChange}
                        placeholder="dd/mm/yyyy"
                      />
                      {errors?.dateOfBirth !== undefined && (
                        <p className="text-danger text-start mt-2">
                          {errors?.dateOfBirth?.message as string}
                        </p>
                      )}
                    </div>
                  </>
                )}
              />

              <Controller
                name="anniversaryDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <div className="form-group col-md-6 dob-profile-details">
                      <label>Anniversary (optional)</label>
                      <input
                        className="form-control"
                        type="date"
                        value={
                          value === null || value === undefined
                            ? ("" as any)
                            : value
                        }
                        onChange={onChange}
                        placeholder="mm/dd/yyyy"
                      />
                      {errors?.anniversaryDate !== undefined && (
                        <p className="text-danger text-start mt-2">
                          {errors?.anniversaryDate?.message as string}
                        </p>
                      )}
                    </div>
                  </>
                )}
              />

              <Controller
                name="spouseBirthdayDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <div className="form-group col-md-6 dob-profile-details">
                      <label>Spouse’s Birthday (optional)</label>
                      <input
                        className="form-control"
                        type="date"
                        pattern="dd/mm/yyyy"
                        value={
                          value === null || value === undefined
                            ? ("" as any)
                            : value
                        }
                        onChange={onChange}
                        placeholder="mm/dd/yyyy"
                      />
                      {errors?.spouseBirthdayDate !== undefined && (
                        <p className="text-danger text-start mt-2">
                          {errors?.spouseBirthdayDate?.message as string}
                        </p>
                      )}
                    </div>
                  </>
                )}
              />

              <div className="form-group col-md-12 mt-2">
                <button
                  className={`primary-btn rounded-btn 
                  ${spinningLoader && "disable"}`}
                >
                  Update Profile
                  {spinningLoader && (
                    <ColorRing
                      visible={true}
                      height="25"
                      width="25"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                    />
                  )}
                </button>
              </div>
            </form>

            {/*-------- Mobile Popup --------*/}
            <div
              className="modal fade"
              id="changenumber"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <MobilePopup isPopupOpen={isPopupOpen} />
            </div>

            {/*-------- Email Popup --------*/}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <EmailPopup isPopupOpen={isPopupOpen} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
