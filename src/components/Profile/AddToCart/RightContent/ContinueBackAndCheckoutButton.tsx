import { useDispatch, useSelector } from "react-redux";
import {
  getCartProductsData,
  setNewCartValuesAction,
} from "store/slices/cartSlice";

import { scrollToTop } from "utils/helper/helper";

import { getAddressData } from "store/slices/addressSlice";
import { createOrderAPI } from "utils/api/service/orderService";
import { ErrorSweetAlert, WarningSweetAlert } from "utils/hooks/SweetAlert";
import { ColorRing } from "react-loader-spinner";
import { useState } from "react";

interface ContinueBackAndCheckoutButtonModel {
  appliedCoupon: any;
  cartStep: any;
  setcartStep: any;
  setIsCouponInputFieldDisable: any;
  setAppliedCoupon: any;
  setOfferOnProducts: any;
}

const ContinueBackAndCheckoutButton = ({
  appliedCoupon,
  cartStep,
  setcartStep,
  setIsCouponInputFieldDisable,
  setAppliedCoupon,
  setOfferOnProducts,
}: ContinueBackAndCheckoutButtonModel) => {
  const { allCoupons, cartProducts, couponAmount } =
    useSelector(getCartProductsData);
  const { addressList, checkoutAddress } = useSelector(getAddressData);
  const [spinningLoader, setSpinningLoader] = useState(false);
  const dispatch = useDispatch();

  const continueHandler = () => {
    scrollToTop();
    if (cartProducts && cartProducts?.length === 0) {
      ErrorSweetAlert({
        title: "Your cart is empty",
        timer: 3000,
      });
      return;
    }

    setcartStep(cartStep + 1);
  };

  // Checkout Functionality
  const checkoutHandler = async () => {
    scrollToTop();

    if (cartStep === 2 && addressList && addressList?.length === 0) {
      ErrorSweetAlert({
        title: "Address does not found",
        timer: 3000,
      });
      return;
    }

    // For Delivery Address id
    const checkoutAddressId = checkoutAddress?.find(
      (addressItem: any) => addressItem?.checked === true
    );

    // For Cart Product data
    const cartProductDetails =
      cartProducts &&
      cartProducts?.map((cartItem) => {
        const tempObj: any = {
          productId: `${cartItem?.id}`,
          karat: `${cartItem?.productKarat}`,
          gram: `${cartItem?.productGram}`,
          productOfferPrice: `${cartItem?.offerPrice}`,
        };
        if (cartItem?.productSize) {
          tempObj["size"] = `${cartItem?.productSize}`;
        }

        return tempObj;
      });

    const orderData: any = {
      productDetails: cartProductDetails,
      deliveryAddress: checkoutAddressId?.id,
    };

    if (appliedCoupon.length > 0) {
      const couponData = allCoupons?.find(
        (couponItem: any) => couponItem?.couponCode === appliedCoupon
      );

      orderData["couponCode"] = `${couponData?.couponCode}`;
      orderData["couponCodeId"] = `${couponData?._id}`;
      orderData["couponCodeDiscountPrice"] = `${couponAmount}`;
    }

    try {
      setSpinningLoader(true);
      const { data } = await createOrderAPI(orderData);

      if (data?.data?.isValid === false) {
        data?.data?.latestData.forEach((value: any) => {
          dispatch(
            setNewCartValuesAction({
              id: value.productId,
              latestOfferPrice: value.latestOfferPrice,
              latestActualPrice: value.latestActualPrice,
            })
          );
        });
        WarningSweetAlert({
          title: "Your cart's product prices have been updated",
          timer: 5000,
        });
        setAppliedCoupon("");
        setIsCouponInputFieldDisable(false);
        setcartStep(1);
        setOfferOnProducts([]);
      } else {
        window.location.href = data?.data?.paymentUrl;
      }
      setSpinningLoader(false);
    } catch {
      console.log("Unable to proceed with the order !");
    }
  };

  return (
    <div className="d-flex">
      {cartStep !== 1 && (
        <button
          type="submit"
          className="btn third-btn me-2"
          onClick={() => setcartStep(cartStep - 1)}
        >
          Back
        </button>
      )}
      {cartStep !== 2 && (
        <button
          type="submit"
          className="btn btn-primary primary-rounded-btn"
          onClick={() => continueHandler()}
        >
          Continue
        </button>
      )}
      {cartStep === 2 && (
        <button
          type="submit"
          className={`btn btn-primary primary-rounded-btn ${
            spinningLoader && "disable opacity-06"
          }`}
          onClick={() => checkoutHandler()}
        >
          Complete Order
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
      )}
    </div>
  );
};

export default ContinueBackAndCheckoutButton;
