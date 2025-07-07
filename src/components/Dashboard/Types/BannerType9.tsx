import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { four_col_slider } from "./SliderConfig";

import {
  AUTH_ROUTE,
  BANNER_ROUTE,
  PRODUCT_ROUTE,
} from "utils/api/routes/clientRoute";
import { useEffect, useState } from "react";
import { addCommaInCurrency, getLocalStorageValue } from "utils/helper/helper";
import { localStorageEnum } from "utils/enum/enum";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlistData,
  updateProductToWishListStatusAction,
} from "store/slices/wishlistSlice";
import { toggleWishListStatusAPI } from "utils/api/service/wishListService";

interface BannerType9Model {
  bannerItem: any;
}

const BannerType9 = ({ bannerItem }: BannerType9Model) => {
  // console.log(bannerItem, "jerry");

  const navigate = useNavigate();
  const token = getLocalStorageValue(localStorageEnum.ACCESS_TOKEN);
  const dispatch = useDispatch();
  const { wishListStatus } = useSelector(getWishlistData);

  const [type9Data, setType9Data] = useState([]);
  const [wishlistDisable, setWishlistDisable] = useState(false);

  useEffect(() => {
    if (bannerItem) {
      const data = bannerItem?.bannerData?.productIds?.filter(
        (bannerItem: any) => bannerItem?.isDeleted === false
      );
      setType9Data(data ?? []);
    }
  }, [bannerItem]);

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
    <section className="product-list-section section-space">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3">
          <div className="section-title pe-sm-4 mb-0">
            <h2>{bannerItem?.title}</h2>
            <p>{bannerItem?.subTitle}</p>
          </div>
          <button
            className="primary-btn"
            onClick={() =>
              navigate(
                BANNER_ROUTE.BANNER_LISTS.replace(
                  ":bannerSlug",
                  `${bannerItem.slug}`
                )
              )
            }
          >
            {bannerItem.buttonText}
          </button>
        </div>

        <div className="product-list">
          <Slider {...four_col_slider} className="product-list-slider">
            {type9Data?.map((bannerValue: any, index: any) => (
              <div className="slider-item" key={index}>
                <div className="item-inner text-center">
                  <div
                    className="slide-block pointer"
                    onClick={() =>
                      navigate(
                        `${PRODUCT_ROUTE.PRODUCT_DETAILS.replace(
                          ":categorySlug",
                          `${
                            bannerValue.productCategoryId &&
                            bannerValue.productCategoryId[0]?.slug
                          }`
                        ).replace(
                          ":productSlug",
                          `${bannerValue.productSlug}`
                        )}`
                      )
                    }
                  >
                    <div className="product-image-box">
                      <img  src={bannerValue.productImage} />
                      <div className="discount-like">
                        <div className="discount-like-inner">
                          <div>
                            <span className="discount badge">
                              {bannerValue.productTag}
                            </span>
                          </div>
                          <div
                            className={`whishlist ${
                              wishlistDisable && "pointer-event-none"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="heart-checkbox"
                              id="heart-checkbox"
                              checked={
                                wishListStatus &&
                                wishListStatus?.some((item: any) =>
                                  item.id === bannerValue?._id &&
                                  item.isWishlisted
                                    ? true
                                    : false
                                )
                              }
                              onChange={() => {
                                wishListToggleHandler(
                                  bannerValue?._id,
                                  bannerValue?.isWishlisted
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
                    </div>
                    <div className="product-detail">
                      <div className="product-title">
                        <span className="product-category">
                          {bannerValue.productCategoryId &&
                            bannerValue.productCategoryId[0]?.slug}
                        </span>
                        <h5>{bannerValue.productTitle}</h5>
                      </div>
                      <div className="product-price">
                        <span className="old-price">
                          ₹
                          {bannerValue?.isSize
                            ? addCommaInCurrency(
                                bannerValue?.productSize[0]?.productActualPrice
                              )
                            : addCommaInCurrency(
                                bannerValue.productActualPrice
                              )}
                        </span>
                        <span className="new-price">
                          ₹
                          {bannerValue?.isSize
                            ? addCommaInCurrency(
                                bannerValue?.productSize[0]?.productOfferPrice
                              )
                            : addCommaInCurrency(
                                bannerValue.productOfferPrice
                              )}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BannerType9;
