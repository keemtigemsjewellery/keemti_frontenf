import { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddressData } from "utils/interface/Profile";
import AddressDetails from "./AddressDetails";
import { deleteAddressAPI } from "utils/api/service/profileServices";
import { useLocation } from "react-router-dom";
import {
  getAddressData,
  setCheckoutAddressAction,
} from "store/slices/addressSlice";

const ConfirmationModal = lazy(() => import("common/ConfirmatiModal"));

interface AddressListModel {
  selectedAddress: AddressData | null;
  setSelectedAddress: any;
  setIsAddressDetailsChanged: any;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

const AddressList = ({
  selectedAddress,
  setSelectedAddress,
  setIsAddressDetailsChanged,
  editMode,
  setEditMode,
}: AddressListModel) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const deleteModalId = "delete-address";

  const { addressList, checkoutAddress } = useSelector(getAddressData);

  const deleteAddressHandler = async () => {
    if (!selectedAddress) return;
    try {
      await deleteAddressAPI(selectedAddress._id);
      setIsAddressDetailsChanged(new Date());
    } catch (error) {
      console.log(error);
    }
  };

  const radioButtonCheckedHanlder = (id: string) => {
    const addressItem =
      checkoutAddress &&
      checkoutAddress?.find((address: any) => address?.id === id);
    return addressItem ? addressItem.checked : false;
  };

  const radioButtonHandler = (id: string) => {
    dispatch(setCheckoutAddressAction(id));
  };

  return (
    <>
      <div className="address-wrap">
        {addressList?.length > 0 && <hr className="mt-4" />}
        {addressList &&
          addressList?.length > 0 &&
          addressList?.map((item: AddressData, index: number) => (
            <div className="d-flex align-items-center mb-4" key={index}>
              {pathname.includes("cart") && (
                <>
                  <div className="cart-radio-button">
                    <label className="radio">
                      <input
                        type="radio"
                        name="radio"
                        className="james"
                        checked={radioButtonCheckedHanlder(item._id)}
                        onChange={() => radioButtonHandler(item._id)}
                      />
                      <span className="mark"></span>
                    </label>
                  </div>
                </>
              )}
              <div
                key={item._id}
                className={`address-box d-flex justify-content-between w-100 ${
                  pathname.includes("cart") &&
                  radioButtonCheckedHanlder(item._id) === true
                    ? "address-border"
                    : ""
                } `}
              >
                <div className="address-left">
                  <h5>
                    {item.fullName} {item.primary && <span>Default</span>}
                  </h5>
                  <p>
                    {`${item.streetaddress}, ${item.locality}, ${item.landmark}`}
                  </p>
                  <p> {`${item.city}, ${item.state} - ${item.pincode}`}</p>
                  <h5>{item.mobileNumber}</h5>
                </div>
                <div className="address-right">
                  <a
                    className="edit icon pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#add-new-address"
                    onClick={() => {
                      setEditMode(true);
                      setSelectedAddress(item);
                    }}
                  >
                    <i className="fal fa-edit"></i>
                  </a>
                  <a
                    className="delete icon pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#delete-address"
                  >
                    <i
                      className="fal fa-trash-alt"
                      onClick={() => {
                        setSelectedAddress(item);
                      }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>

      <ConfirmationModal
        modalId={deleteModalId}
        title="Are you sure you want to delete this address?"
        onConfirm={deleteAddressHandler}
      />
      <AddressDetails
        selectedAddress={selectedAddress}
        editMode={editMode}
        setIsAddressDetailsChanged={setIsAddressDetailsChanged}
      />
    </>
  );
};

export default AddressList;
