import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  addNewAddressAPI,
  updateAddressAPI,
} from "utils/api/service/profileServices";
import { AddressData, addNewAddressModel } from "utils/interface/Profile";
import { addNewAddressSchema } from "utils/validationSchema/Profile";
import CustomField from "common/CustomField";

interface AddressDetailsModel {
  setIsAddressDetailsChanged: Function;
  editMode: boolean;
  selectedAddress: AddressData | null;
}

const AddressDetails = ({
  setIsAddressDetailsChanged,
  editMode,
  selectedAddress,
}: AddressDetailsModel) => {
  const closeButton = useRef<HTMLButtonElement>(null);

  const blankForm = {
    fullName: "",
    mobileNumber: "",
    pincode: "",
    locality: "",
    streetaddress: "",
    landmark: "",
    city: "",
    state: "",
    primary: false,
  };

  const [defalultValueForm, setDefalultValueForm] = useState(blankForm);

  useEffect(() => {
    if (editMode && selectedAddress) {
      setDefalultValueForm({
        fullName: selectedAddress.fullName || "",
        mobileNumber: selectedAddress.mobileNumber || "",
        pincode: selectedAddress.pincode || "",
        locality: selectedAddress.locality || "",
        streetaddress: selectedAddress.streetaddress || "",
        landmark: selectedAddress.landmark || "",
        city: selectedAddress.city || "",
        state: selectedAddress.state || "",
        primary: selectedAddress.primary || false,
      });
    } else {
      setDefalultValueForm(blankForm);
    }
  }, [editMode, selectedAddress]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<addNewAddressModel>({
    resolver: yupResolver(addNewAddressSchema),
    defaultValues: blankForm,
    values: defalultValueForm,
  });

  const onSubmit: SubmitHandler<addNewAddressModel> = async (
    data: addNewAddressModel
  ) => {
    try {
      if (editMode) {
        await updateAddressAPI(selectedAddress!!._id, data);
      } else {
        await addNewAddressAPI(data);
      }
      setIsAddressDetailsChanged(new Date());
      closeButton.current?.click();
      if (!editMode) {
        reset(blankForm);
      }
      clearErrors();
    } catch {
      console.log("Unable to add address");
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="add-new-address"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="address modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editMode === true ? "Edit Address" : "Add New Adddres"}{" "}
              </h5>
              <button
                ref={closeButton}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-4 my-3">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-wrap justify-content-between"
              >
                <div className="form-group mb-4 address-input">
                  <label>Full Name</label>
                  <CustomField
                    name="fullName"
                    control={control}
                    inputType="text"
                    placeholder="Full Name*"
                    errors={errors}
                  />
                </div>
                <div className="form-group mb-4 address-input">
                  <label>Mobile Number</label>
                  <CustomField
                    name="mobileNumber"
                    control={control}
                    inputType="text"
                    placeholder="Mobile Number*"
                    errors={errors}
                  />
                </div>

                <div className="form-group mb-4 address-input">
                  <label>Street Address</label>
                  <CustomField
                    name="streetaddress"
                    control={control}
                    inputType="textarea"
                    placeholder="Address (Area and Street)*"
                    errors={errors}
                    textAreaRow={4}
                  />
                </div>

                <div className="form-group mb-4 address-input">
                  <label>Locality</label>
                  <CustomField
                    name="locality"
                    control={control}
                    inputType="textarea"
                    placeholder="Flat / House No / Building Name / Company*"
                    errors={errors}
                    textAreaRow={2}
                  />
                </div>

                <div className="form-group mb-4 address-input">
                  <label>Pincode</label>
                  <CustomField
                    name="pincode"
                    control={control}
                    inputType="text"
                    placeholder="Pincode"
                    errors={errors}
                  />
                </div>

                <div className="form-group mb-4 address-input">
                  <label>Landmark</label>
                  <CustomField
                    name="landmark"
                    control={control}
                    inputType="text"
                    placeholder="Landmark (Opional)"
                    errors={errors}
                  />
                </div>

                <div className="form-group mb-4 address-input">
                  <label>City</label>
                  <CustomField
                    name="city"
                    control={control}
                    inputType="text"
                    placeholder="City / District / Town*"
                    errors={errors}
                    // disable={true}
                  />
                </div>

                <div className="form-group mb-4 address-input">
                  <label>State</label>
                  <CustomField
                    name="state"
                    control={control}
                    inputType="text"
                    placeholder="State*"
                    errors={errors}
                    // disable={true}
                  />
                </div>

                <Controller
                  name="primary"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <>
                        <Form.Check
                          type="switch"
                          id="primary"
                          name="primary"
                          className="pe-4 pointer mb-4 d-flex align-items-center"
                          onChange={onChange}
                          value={value as any}
                          checked={value}
                          label="Defaul value"
                        />
                        {errors && errors?.primary && (
                          <p className="text-danger text-start mt-2">
                            {errors?.primary.message as string}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
                <button className="primary-btn w-100">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
