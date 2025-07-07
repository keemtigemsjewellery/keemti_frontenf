import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCouponsAction,
  getCartProductsData,
  getDiscountAmountAction,
  getTotalAmountAction,
  removeProductFromCartAction,
  setCouponAmountAction,
} from "store/slices/cartSlice";
import { estimateDelivery } from "utils/helper/estimateDelivery";
import {
  addCommaInCurrency,
  arraytoStringTypeArray,
} from "utils/helper/helper";

import delete_icon from "../../../../assets/images/icons/delete-icon.svg";
import { getAllCouponsAPI } from "utils/api/service/productService";

import DiscountBadge from "../../../../assets/images/sale.svg";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "utils/api/routes/clientRoute";

interface CartProductModel {
  offerOnProducts: any;
  setOfferOnProducts: any;
  setAppliedCoupon: any;
  setIsCouponInputFieldDisable: any;
}
const CartProduct = ({
  offerOnProducts,
  setOfferOnProducts,
  setAppliedCoupon,
  setIsCouponInputFieldDisable,
}: CartProductModel) => {
  const { cartProducts, adminShippingMinValue, adminShippingMaxValue }: any =
    useSelector(getCartProductsData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteCartProductHandler = (id: string, amount: number) => {
    dispatch(removeProductFromCartAction({ id, amount }));

    setOfferOnProducts([]);
    setAppliedCoupon("");
    setIsCouponInputFieldDisable(false);
    dispatch(setCouponAmountAction(0));
  };

  useEffect(() => {
    dispatch(getTotalAmountAction());
    dispatch(getDiscountAmountAction());
  }, []);

  // For coupon code API integration
  useEffect(() => {
    const getAllCouponsHandler = async () => {
      const allProductIds =
        cartProducts?.map((cartItem: any) => {
          return cartItem.id;
        }) ?? [];

      const queryPrams = arraytoStringTypeArray(allProductIds);

      try {
        const { data } = await getAllCouponsAPI(
          allProductIds.length > 0 ? queryPrams : []
        );
        dispatch(getAllCouponsAction(data?.data));
      } catch {
        console.log("Unable to get all coupans");
      }
    };
    getAllCouponsHandler();
  }, [cartProducts]);

  return (
    <div className="tab-content" id="nav-tabContent">
      {cartProducts && cartProducts.length ? (
        <div
          className="product-block tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          {cartProducts.map((cartItem: any) => (
            <div className="product-row" key={cartItem.id}>
              <div className="product-detail-global">
                <div className="img">
                  <img  src={cartItem.productImage} alt="list" />
                </div>
                <div className="content-wrapper">
                  <div className="txt">
                    <h6 className="mb-1">{cartItem.productTitle}</h6>
                    <div className="category mb-1">
                      <span className="label">Gold: </span>
                      <span>{cartItem.productKarat} karat</span>
                    </div>
                    {cartItem?.productSize && (
                      <div className="category mb-1">
                        <span className="label">Size: </span>
                        <span>{cartItem.productSize}</span>
                      </div>
                    )}
                  </div>
                  <div className="price">
                    <span>₹{addCommaInCurrency(cartItem.actualPrice)}</span>
                    <h3>₹{addCommaInCurrency(cartItem.offerPrice)}</h3>
                  </div>
                  {offerOnProducts?.find(
                    (offerOnProductsItem: any) =>
                      offerOnProductsItem?.productId === cartItem.id &&
                      offerOnProductsItem?.isApplicable
                  ) && (
                    <div className="d-flex discount-badge">
                      <img  src={DiscountBadge} alt="discount-badge" />
                      <p>Coupon Applied</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="estimate-delivery">
                <span>Estimated Delivery Between</span>
                <span className="date">
                  {estimateDelivery(
                    adminShippingMinValue,
                    adminShippingMaxValue
                  )}
                </span>
              </div>

              <a
                onClick={() =>
                  deleteCartProductHandler(cartItem.id!, cartItem.actualPrice)
                }
                className="delete pointer"
                title="Delete"
              >
                <img  src={delete_icon} alt="Delete" />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-product-in-cart">
          <i
            className="fal fa-exclamation-circle"
            style={{ fontSize: "40px" }}
          ></i>
          <h3 className="mt-3">Your cart is empty</h3>
          <div className="btn-wrap text-center mt-4">
            <button
              onClick={() =>
                navigate(PRODUCT_ROUTE.PRODUCT_LISTING_ALL_PRODUCTS)
              }
              className="btn primary-btn h-auto lh-1 px-5 py-3 fw-500"
            >
              Start shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
