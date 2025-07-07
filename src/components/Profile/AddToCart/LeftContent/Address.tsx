import { useEffect, useState } from "react";
import AddressList from "../../Address/AddressList";
import { useDispatch } from "react-redux";
import { getAddressListAPI } from "utils/api/service/profileServices";
import { AddressData } from "utils/interface/Profile";
import {
  getCheckoutAddressAction,
  setAddressList,
} from "store/slices/addressSlice";

const Address = () => {
  const dispatch = useDispatch();

  const [isAddressDetailsChanged, setIsAddressDetailsChanged] = useState(
    new Date()
  );
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getAddressList();
  }, [isAddressDetailsChanged]);

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

  return (
    <div id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
      <div className="accountpage-sec">
        <div className="accountpage-right white-bg white-boxbg">
          <div className="d-flex align-items-end head-btn justify-content-between">
            <div className="head withbreadcrumb">
              <h3>Delivery Address</h3>
            </div>
            <div className="">
              <a
                className="btn rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#add-new-address"
                onClick={() => {
                  setEditMode(false);
                }}
              >
                <i className="fal fa-plus me-2"></i> Add New Address
              </a>
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
    </div>
  );
};

export default Address;
