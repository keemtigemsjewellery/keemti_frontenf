import { useEffect, useState } from "react";

import { AddressData } from "utils/interface/Profile";
import { getAddressListAPI } from "utils/api/service/profileServices";
import { useDispatch } from "react-redux";

import AddressList from "./AddressList";
import {
  getCheckoutAddressAction,
  setAddressList,
} from "store/slices/addressSlice";

const ProfileAddress = () => {
  const dispatch = useDispatch();

  const [isAddressDetailsChanged, setIsAddressDetailsChanged] = useState(
    new Date()
  );
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getAddressList = async () => {
      try {
        const { data } = await getAddressListAPI();
        dispatch(setAddressList(data.data));

        const checkoutInitialData = data?.data?.map(
          (addressItem: any, index: any) => {
            if (index === 0) {
              return {
                id: addressItem._id,
                checked: true,
              };
            }
            return {
              id: addressItem._id,
              checked: false,
            };
          }
        );

        dispatch(getCheckoutAddressAction(checkoutInitialData));
      } catch (error) {
        console.log(error);
      }
    };
    getAddressList();
  }, [isAddressDetailsChanged]);

  return (
    <>
      <div className="col-md-12 col-lg-8 col-xl-9">
        <div className="accountpage-right white-bg white-boxbg">
          <div className="d-flex align-items-end head-btn justify-content-between">
            <div className="head withbreadcrumb">
              <h3>Address</h3>
            </div>
            <div className="">
              <div
                className="btn rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#add-new-address"
                onClick={() => {
                  setEditMode(false);
                }}
              >
                <i className="fal fa-plus me-2"></i> Add New Address
              </div>
            </div>
          </div>
          <AddressList
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            setIsAddressDetailsChanged={setIsAddressDetailsChanged}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileAddress;
