import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCartProductsData,
  getDiscountAmountAction,
  setCouponAmountAction,
} from "store/slices/cartSlice";

import { addCommaInCurrency } from "utils/helper/helper";
import ContinueBackAndCheckoutButton from "./ContinueBackAndCheckoutButton";
import { applyCouponAPI } from "utils/api/service/orderService";
import { ErrorSweetAlert, SuccessSweetAlert } from "utils/hooks/SweetAlert";

interface CoupanCodeModel {
  appliedCoupon: any;
  setAppliedCoupon: any;
  isCouponInputFieldDisable: any;
  setIsCouponInputFieldDisable: any;
  cartStep: any;
  setcartStep: any;
  setOfferOnProducts: any;
}

const CoupanCode = ({
  appliedCoupon,
  setAppliedCoupon,
  isCouponInputFieldDisable,
  setIsCouponInputFieldDisable,
  cartStep,
  setcartStep,
  setOfferOnProducts,
}: CoupanCodeModel) => {
  const {
    cartProducts,
    totalAmount,
    discountAmount,
    couponAmount,
    adminShippingAmount,
    adminFlatShippingCharge,
    adminPercentageShippingCharge,
    shippingType,
  } = useSelector(getCartProductsData);
  const { allCoupons } = useSelector(getCartProductsData);
  const dispatch = useDispatch();

  const [shippingAmount, setShippingAmount] = useState(0);

  useEffect(() => {
    // For Shipping charges
    const finalAmount = totalAmount - (discountAmount + couponAmount);

    if (finalAmount) {
      if (cartProducts?.length === 0 || finalAmount >= adminShippingAmount) {
        setShippingAmount(0);
      } else {
        if (shippingType === "percentage") {
          const shippingCharge =
            finalAmount * (adminPercentageShippingCharge / 100);

          setShippingAmount(shippingCharge ?? 200);
        } else {
          setShippingAmount(adminFlatShippingCharge ?? 200);
        }
      }
    }

    // For Discount Coupon
    dispatch(getDiscountAmountAction());
  }, [cartProducts, totalAmount, discountAmount, couponAmount]);

  useEffect(() => {
    dispatch(setCouponAmountAction(0));
  }, []);

  const couponHandler = async () => {
    const cartProductDetails =
      cartProducts &&
      cartProducts?.map((cartItem) => {
        const tempObj: any = {
          productId: `${cartItem?.id}`,
        };
        if (cartItem?.productSize) {
          tempObj["size"] = `${cartItem?.productSize}`;
        }

        return tempObj;
      });

    const couponExist =
      allCoupons &&
      allCoupons?.find(
        (couponItem: any) =>
          couponItem?.couponCode === appliedCoupon.toLocaleUpperCase()
      );

    if (couponExist === undefined) {
      setOfferOnProducts([]);
      ErrorSweetAlert({
        title: "Coupon does not exist !!",
        timer: 3000,
      });
      return <></>;
    }

    const couponData = {
      couponCodeId: couponExist?._id,
      productDetails: cartProductDetails,
    };

    try {
      const { data } = await applyCouponAPI(couponData);

      setOfferOnProducts(data?.data?.productData);
      dispatch(setCouponAmountAction(data?.data?.couponDiscount));
      setIsCouponInputFieldDisable(true);

      SuccessSweetAlert({
        title: "Coupon applied successfully !!",
        timer: 2000,
      });
    } catch {
      setOfferOnProducts([]);
      setIsCouponInputFieldDisable(false);

      ErrorSweetAlert({
        title: "Coupon is not applicable on the above cart products !!",
        timer: 2000,
      });
    }
  };

  const removeCouponCodeHandler = () => {
    setOfferOnProducts([]);
    setAppliedCoupon("");
    setIsCouponInputFieldDisable(false);
    dispatch(setCouponAmountAction(0));
  };

  return (
    <div className="col-lg-4 pt-4 pt-lg-0">
      {cartProducts?.length > 0 && cartStep === 1 && (
        <div className="checkout-side-block">
          <div className="accordion" id="accordionExample2">
            <div className="accordion-item">
              <h4 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button p-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {`${allCoupons?.length} Coupons Available`}
                </button>
              </h4>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                // className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample2"
              >
                <div className="accordion-body">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Add Coupon code"
                      value={appliedCoupon}
                      className={`form-control text-uppercase ${
                        isCouponInputFieldDisable && "disable"
                      }`}
                      onChange={(e) => setAppliedCoupon(e.target.value)}
                    />
                    {!isCouponInputFieldDisable ? (
                      <button onClick={() => couponHandler()}>Apply</button>
                    ) : (
                      <button
                        onClick={() => {
                          removeCouponCodeHandler();
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {allCoupons?.map((couponItem: any, index: any) => (
                    <div className="discount" key={index}>
                      <span className="rate">
                        {couponItem.type === "flat" && (
                          <>
                            Flat ₹
                            {addCommaInCurrency(`${couponItem.discountPrice}`)}{" "}
                            OFF on minimum ₹
                            {addCommaInCurrency(
                              `${couponItem.minimumOrderValue}`
                            )}{" "}
                            order value
                          </>
                        )}
                        {couponItem.type === "percentage" && (
                          <>
                            Flat {couponItem.discountPercentage}% OFF on minimum
                            ₹
                            {addCommaInCurrency(
                              `${couponItem.minimumOrderValue}`
                            )}{" "}
                            order value
                          </>
                        )}
                      </span>
                      <div className="coupoe-code">
                        <span>
                          Coupon code:
                          <span className="code">{couponItem.couponCode}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="checkout-side-block">
        <h4 className="title">
          Price Detail
          <span>{cartProducts?.length ?? 0} Item</span>
        </h4>
        <ul>
          <li>
            <span>Total MRP</span>
            <span>₹{addCommaInCurrency(`${totalAmount}`)}</span>
          </li>
          <li>
            <span className="dis">Discount on MRP</span>
            <span className="dis">
              ₹{addCommaInCurrency(`${discountAmount}`)}
            </span>
          </li>
          <li>
            <span className="dis">Coupon Discount</span>
            <span className="dis">
              ₹{addCommaInCurrency(`${couponAmount}`)}
            </span>
          </li>
          <li>
            <span>Shipping Charge</span>
            <span>{`₹${Math.floor(shippingAmount)}`}</span>
          </li>

          <li>
            <span>Total Amount</span>
            <span>
              ₹
              {addCommaInCurrency(
                `${
                  totalAmount -
                  (discountAmount + couponAmount) +
                  Math.floor(shippingAmount)
                }`
              )}
            </span>
          </li>
        </ul>
      </div>

      <ContinueBackAndCheckoutButton
        appliedCoupon={appliedCoupon}
        cartStep={cartStep}
        setcartStep={setcartStep}
        setIsCouponInputFieldDisable={setIsCouponInputFieldDisable}
        setAppliedCoupon={setAppliedCoupon}
        setOfferOnProducts={setOfferOnProducts}
      />
    </div>
  );
};

export default CoupanCode;
