import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getWishlistData,
  updateProductToWishListStatusAction,
} from "store/slices/wishlistSlice";
import { AUTH_ROUTE, PRODUCT_ROUTE } from "utils/api/routes/clientRoute";
import { toggleWishListStatusAPI } from "utils/api/service/wishListService";
import { localStorageEnum } from "utils/enum/enum";
import { addCommaInCurrency, getLocalStorageValue } from "utils/helper/helper";

interface MatchTheProductWithModel {
  details: any;
  title: any;
}
const QuickProducts = ({ details, title }: MatchTheProductWithModel) => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const token = getLocalStorageValue(localStorageEnum.ACCESS_TOKEN);

  const dispatch = useDispatch();
  const { wishListStatus } = useSelector(getWishlistData);

  const [wishlistDisable, setWishlistDisable] = useState(false);

  const wishListToggleHandler = async (id: string, isWishlisted: any) => {
    if (!token) {
      navigate(AUTH_ROUTE.LOGIN);
      return <></>;
    }

    const params: any = {
      productId: id,
    };

    if (isWishlisted === false) {
      params.type = "add";
    }

    try {
      dispatch(updateProductToWishListStatusAction(id));
      setWishlistDisable(true);
      await toggleWishListStatusAPI(params);
      setWishlistDisable(false);
    } catch {
      dispatch(updateProductToWishListStatusAction(id));
      setWishlistDisable(false);
      console.log("Unable to update wishlist");
    }
  };

  return (
    <>
      {details && details?.length > 0 && (
        <div className="container mt-3">
          <div
            className={`white-bg white-boxbg ${
              details?.length < 2 && title === "Recently Viewed" && "d-none"
            }`}
          >
            <div className="standout-sec">
              <h5 className="pt-3 pb-1">{title}</h5>
            </div>
            <div className="product-list">
              <div className="product-list-slider row">
                {details && details.length > 0 && (
                  <>
                    {details.map((productItem: any, index: any) => (
                      <div
                        className={`slider-item recent 
                        ${
                          title === "Recently Viewed" && index === 0 && "d-none"
                        }`}
                        key={productItem._id}
                      >
                        <div className="item-inner text-center">
                          <div className="slide-block">
                            <div className="product-image-box">
                              <img
                                className="pointer"
                                src={productItem.productImage}
                                alt="productImage"
                                onClick={() =>
                                  navigate(
                                    `${PRODUCT_ROUTE.PRODUCT_DETAILS.replace(
                                      ":categorySlug",
                                      `${categorySlug}`
                                    ).replace(
                                      ":productSlug",
                                      `${productItem?.productSlug}`
                                    )}`
                                  )
                                }
                              />
                              <div className="discount-like">
                                <div className="discount-like-inner">
                                  <div>
                                    {productItem.productTag !== "New In" &&
                                      productItem.productTag !== "" && (
                                        <span className="discount badge">
                                          {productItem.productTag}
                                        </span>
                                      )}
                                  </div>
                                  <div
                                    className={`whishlist recent
                              ${wishlistDisable && "pointer-event-none"}`}
                                  >
                                    <input
                                      type="checkbox"
                                      className="heart-checkbox"
                                      id="heart-checkbox"
                                      checked={
                                        wishListStatus &&
                                        wishListStatus?.some((item: any) =>
                                          item.id === productItem?._id &&
                                          item.isWishlisted
                                            ? true
                                            : false
                                        )
                                      }
                                      onChange={() => {
                                        wishListToggleHandler(
                                          productItem?._id,
                                          productItem?.isWishlisted
                                        );
                                      }}
                                    />
                                    <label
                                      htmlFor="heart-checkbox"
                                      className="fal fa-heart"
                                    ></label>
                                  </div>
                                </div>
                              </div>
                              {productItem.productTag === "New In" && (
                                <span className="bottom-badge position-absolute">
                                  {productItem.productTag}
                                </span>
                              )}
                            </div>
                            <div
                              className="product-detail"
                              onClick={() =>
                                navigate(
                                  `${PRODUCT_ROUTE.PRODUCT_DETAILS.replace(
                                    ":categorySlug",
                                    `${categorySlug}`
                                  ).replace(
                                    ":productSlug",
                                    `${productItem?.productSlug}`
                                  )}`
                                )
                              }
                            >
                              <div className="product-title">
                                <span className="product-category">
                                  {productItem?.productCategoryId?.[0]?.name ??
                                    ""}
                                </span>
                                <h5>
                                  <a>{productItem.productTitle}</a>
                                </h5>
                              </div>
                              <div className="product-price">
                                <span className="old-price">
                                  ₹
                                  {addCommaInCurrency(
                                    productItem.productActualPrice
                                  )}
                                </span>
                                <span className="new-price">
                                  ₹
                                  {addCommaInCurrency(
                                    productItem.productOfferPrice
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickProducts;
