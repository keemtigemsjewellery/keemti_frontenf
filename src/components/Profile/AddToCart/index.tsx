import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartProductsData,
  getTotalAmountAction,
} from "store/slices/cartSlice";

import AddressPage from "./LeftContent/Address";
import ProgressBar from "./ProgressBar";
import CoupanCode from "./RightContent/CoupanCode";
import CartProduct from "./LeftContent/CartProduct";

const AddToCart = () => {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector(getCartProductsData);

  useEffect(() => {
    dispatch(getTotalAmountAction());
  }, []);

  const [cartStep, setcartStep] = useState(1);

  const [offerOnProducts, setOfferOnProducts] = useState([]);

  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isCouponInputFieldDisable, setIsCouponInputFieldDisable] =
    useState(false);

  return (
    <div className="inner-page graybg">
      <div className="cart-checkout">
        <div className="container">
          <div className="cart-checkout-inner">
            {cartProducts && cartProducts?.length > 0 && (
              <ProgressBar cartStep={cartStep} />
            )}
            <div className="checkout-detail">
              <div className="row mt-4">
                <div className="col-lg-8">
                  {cartStep === 1 && (
                    <CartProduct
                      offerOnProducts={offerOnProducts}
                      setOfferOnProducts={setOfferOnProducts}
                      setAppliedCoupon={setAppliedCoupon}
                      setIsCouponInputFieldDisable={
                        setIsCouponInputFieldDisable
                      }
                    />
                  )}
                  {cartStep === 2 && <AddressPage />}
                </div>

                <CoupanCode
                  appliedCoupon={appliedCoupon}
                  setAppliedCoupon={setAppliedCoupon}
                  isCouponInputFieldDisable={isCouponInputFieldDisable}
                  setIsCouponInputFieldDisable={setIsCouponInputFieldDisable}
                  cartStep={cartStep}
                  setcartStep={setcartStep}
                  setOfferOnProducts={setOfferOnProducts}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
