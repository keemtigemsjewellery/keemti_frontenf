/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllWishListedProdctsAPI } from "../../../utils/api/service/wishListService";
import {
  getWishListProductsAction,
  getWishlistData,
  removeProductFromAllWishListsAction,
} from "../../../store/slices/wishlistSlice";
import { addCommaInCurrency } from "utils/helper/helper";
import { PRODUCT_ROUTE } from "utils/api/routes/clientRoute";
import { useNavigate } from "react-router-dom";
import { toggleWishListStatusAPI } from "../../../utils/api/service/wishListService";
import WishlistingLoader from "../Loader/WishlistingLoader";
import Skeleton from "react-loading-skeleton";

const ProfileWishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allWishlists } = useSelector(getWishlistData);

  const [wishlistAPICount, setWishlistAPICount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getWishlistDataHandler = async () => {
        const { data } = await getAllWishListedProdctsAPI();

        const AllProductsWithoutDelete = data?.data?.filter(
          (product: any) => product?.productId?.isDeleted === false
        );
        setWishlistAPICount(AllProductsWithoutDelete?.length);
        dispatch(getWishListProductsAction(AllProductsWithoutDelete));
      };
      getWishlistDataHandler();
    } catch {
      console.log("Unable to get wishlist products");
    }
  }, []);

  useEffect(() => {
    if (allWishlists && allWishlists?.length === wishlistAPICount) {
      setLoading(false);
    }
  }, [allWishlists, wishlistAPICount]);

  const removeWishlistHandler = async (
    productId: string,
    wishlistId: string
  ) => {
    try {
      dispatch(removeProductFromAllWishListsAction(wishlistId));
      await toggleWishListStatusAPI({
        productId: productId,
      });
    } catch {
      console.log("Unable to Remove product from wishlist");
    }
  };

  return (
    <>
      <div className="col-md-12 col-lg-8 col-xl-9">
        <div className="accountpage-right white-bg white-boxbg">
          <div className="head withbreadcrumb">
            {!loading && (
              <>
                <h3>My Wishlist</h3>
                {allWishlists?.length !== 0 ? (
                  <p className="mb-3 mb-sm-0">
                    Found {allWishlists?.length || 0} results
                  </p>
                ) : (
                  <div className="head withbreadcrumb ps-0 ps-sm-5 pt-3 pt-sm-4">
                    <i
                      className="fal fa-exclamation-circle"
                      style={{ fontSize: "40px" }}
                    ></i>
                    <h3 className="mt-3 mb-2">Your wishlist is empty</h3>
                    <p className="mb-2">There is no recent product to show.</p>
                    <p className="mb-3">
                      Choose from 100+ trendy, lightweight and affordable
                      designer pieces!
                    </p>
                    <div className="btn-wrap mt-4">
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
              </>
            )}
          </div>
          {loading && (
            <>
              <h3>
                <Skeleton count={1} width={100} />
              </h3>
              <p>
                <Skeleton count={1} width={100} />
              </p>
            </>
          )}
          {!loading && (
            <div className="wishlist-wrap product-list-section">
              <div className="product-list prolist-right p-0">
                <div className="product-list-slider row">
                  {allWishlists &&
                    allWishlists?.map((product: any, idx: number) => {
                      return (
                        <div
                          className="slider-item col-md-6 col-lg-4 col-xl-3"
                          key={idx}
                        >
                          <div className="item-inner text-center">
                            <div className="slide-block">
                              <div className="product-image-box">
                                <img
                                  src={product?.productId?.productImage}
                                  alt="productImage"
                                />
                                <div className="discount-like">
                                  <div className="discount-like-inner">
                                    <div>
                                      {product?.productId.productTag !==
                                        "New In" &&
                                        product?.productId.productTag !==
                                          "" && (
                                          <span className="discount badge">
                                            {product?.productId.productTag}
                                          </span>
                                        )}
                                    </div>
                                    <div className="whishlist">
                                      <input
                                        type="checkbox"
                                        className="heart-checkbox"
                                        id="heart-checkbox"
                                        checked={true}
                                        onChange={(e) => {
                                          removeWishlistHandler(
                                            product?.productId?._id,
                                            product?._id
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
                                {product?.productId?.productTag ===
                                  "New In" && (
                                  <span className="bottom-badge position-absolute">
                                    {product?.productId?.productTag}
                                  </span>
                                )}
                              </div>
                              <div
                                className="product-detail"
                                onClick={() =>
                                  navigate(
                                    `${PRODUCT_ROUTE.PRODUCT_DETAILS.replace(
                                      ":categorySlug",
                                      `${product?.productCategory?.name?.toLowerCase()}`
                                    ).replace(
                                      ":productSlug",
                                      `${product?.productId?.productSlug}`
                                    )}`
                                  )
                                }
                              >
                                <div className="product-title">
                                  <span className="product-category">
                                    EARRINGS
                                  </span>
                                  <h5>
                                    <a>{product?.productId?.productTitle}</a>
                                  </h5>
                                </div>
                                <div className="product-price">
                                  <span className="old-price">
                                    ₹
                                    {product?.productId?.isSize
                                      ? addCommaInCurrency(
                                          product?.productId?.productSize?.[0]
                                            ?.productActualPrice
                                        )
                                      : addCommaInCurrency(
                                          product?.productId?.productActualPrice
                                        )}
                                  </span>
                                  <span className="new-price">
                                    ₹
                                    {product?.productId?.isSize
                                      ? addCommaInCurrency(
                                          product?.productId?.productSize?.[0]
                                            ?.productOfferPrice
                                        )
                                      : addCommaInCurrency(
                                          product?.productId?.productOfferPrice
                                        )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
          {loading && <WishlistingLoader />}
        </div>
      </div>
    </>
  );
};

export default ProfileWishlist;
