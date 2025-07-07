import { useLocation, useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";

import {
  addCommaInCurrency,
  getLocalStorageValue,
  removeEmptyParams,
  slugToHeading,
  urlSearchParams,
  wordCapitalize,
} from "utils/helper/helper";
import ProductListingLoader from "./Loader/ProductListingLoader";

import {
  AUTH_ROUTE,
  BANNER_ROUTE,
  PRODUCT_ROUTE,
} from "utils/api/routes/clientRoute";
import { toggleWishListStatusAPI } from "utils/api/service/wishListService";
import {
  getWishlistData,
  updateProductToWishListStatusAction,
} from "store/slices/wishlistSlice";
import { localStorageEnum } from "utils/enum/enum";
import { Fragment, useState } from "react";
import CustomPagination from "components/Common/CustomPagination";

interface ProductListingModel {
  loading: boolean;
  paginationCurrentPage: any;
  setPaginationCurrentPage: any;
  productListingData: any;
  totalPages: any;
  totalProducts: any;
}
const ProductListing = ({
  loading,
  paginationCurrentPage,
  setPaginationCurrentPage,
  productListingData,
  totalPages,
  totalProducts,
}: ProductListingModel) => {
  const { categorySlug, bannerSlug, searchSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams: any = queryString.parse(location.search);

  const [wishlistDisable, setWishlistDisable] = useState(false);

  const token = getLocalStorageValue(localStorageEnum.ACCESS_TOKEN);

  const dispatch = useDispatch();

  const { wishListStatus } = useSelector(getWishlistData);

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

  const removeFilterBadgeHandler = (
    allValues: any,
    key: any,
    value: any,
    singleValue: any
  ) => {
    if (singleValue) {
      delete allValues[key];
    }

    if (!singleValue) {
      const tempArray = allValues[key].split(",");
      const filteredArray = tempArray.filter((item: any) => item !== value);
      allValues[key] = filteredArray.join(",");
    }

    const filteredQueryParams = removeEmptyParams(allValues);
    const queryParamsData = urlSearchParams(filteredQueryParams);

    categorySlug &&
      navigate(
        `${PRODUCT_ROUTE.PRODUCT_LISTS.replace(
          ":categorySlug",
          `${categorySlug}?${queryParamsData}`
        )}`
      );

    bannerSlug &&
      navigate(
        `${BANNER_ROUTE.BANNER_LISTS.replace(
          ":bannerSlug",
          `${bannerSlug}?${queryParamsData}`
        )}`
      );

    searchSlug &&
      navigate(
        PRODUCT_ROUTE.PRODUCT_SEARCH_LISTS.replace(
          ":searchSlug",
          `${searchSlug}?${queryParamsData}`
        )
      );

    categorySlug === undefined &&
      bannerSlug === undefined &&
      searchSlug === undefined &&
      navigate(
        `${PRODUCT_ROUTE.PRODUCT_LISTING_ALL_PRODUCTS}?${queryParamsData}`
      );
  };

  const onProductClickRedirectHandler = (
    value: string,
    redirectValue?: any
  ) => {
    let categoryName;

    if (categorySlug !== undefined) {
      categoryName = categorySlug;
    }

    if (categorySlug === undefined) {
      categoryName = redirectValue?.productCategoryId?.[0]?.slug;
    }

    navigate(
      `${PRODUCT_ROUTE.PRODUCT_DETAILS.replace(
        ":categorySlug",
        `${categoryName}`
      ).replace(":productSlug", `${value}`)}`
    );
  };

  return (
    <div className="col-md-8 col-lg-9 col-sm-12">
      <div className="white-bg prolist-right">
        <div className="d-flex justify-content-between align-items-center prolist-top">
          <div className="section-title mb-0">
            <div className="head">
              {!loading && (
                <>
                  {categorySlug && <h3>{slugToHeading(categorySlug)}</h3>}
                  {bannerSlug && <h3>{slugToHeading(bannerSlug)}</h3>}
                  {searchSlug && <h3>{slugToHeading(searchSlug)}</h3>}
                  {categorySlug === undefined &&
                    bannerSlug === undefined &&
                    searchSlug === undefined && <h3>All Products</h3>}
                  <p className="mb-3 mb-sm-0">Found {totalProducts} results</p>
                  <ul>
                    {Object.keys(queryParams).map((value, index) => (
                      <Fragment key={index}>
                        {!queryParams[value]?.includes(",") && (
                          <li>
                            <span>
                              {wordCapitalize(queryParams[value])}
                              <i
                                className="fas fa-times"
                                onClick={() =>
                                  removeFilterBadgeHandler(
                                    queryParams,
                                    value,
                                    queryParams[value],
                                    true
                                  )
                                }
                              ></i>
                            </span>
                          </li>
                        )}
                        {queryParams[value]?.includes(",") &&
                          queryParams[value]
                            ?.split(",")
                            .map((val: any, index: any) => (
                              <li key={index}>
                                <span>
                                  {wordCapitalize(val)}

                                  <i
                                    className="fas fa-times"
                                    onClick={() =>
                                      removeFilterBadgeHandler(
                                        queryParams,
                                        value,
                                        val,
                                        false
                                      )
                                    }
                                  ></i>
                                </span>
                              </li>
                            ))}
                      </Fragment>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
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
          <>
            <div className="product-list">
              <div className="product-list-slider row">
                {productListingData && productListingData.length > 0 && (
                  <>
                    {productListingData.map((productItem: any) => (
                      <div
                        className="slider-item col-md-6 col-lg-4 col-xl-3"
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
                                  onProductClickRedirectHandler(
                                    productItem.productSlug,
                                    productItem
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
                                onProductClickRedirectHandler(
                                  productItem.productSlug,
                                  productItem
                                )
                              }
                            >
                              <div className="product-title">
                                <span className="product-category">
                                  {categorySlug}
                                  {categorySlug === undefined &&
                                    productItem?.productCategoryId?.[0]?.name}
                                </span>
                                <h5>
                                  <a>{productItem.productTitle}</a>
                                </h5>
                              </div>
                              <div className="product-price">
                                <span className="old-price">
                                  ₹
                                  {productItem?.isSize
                                    ? addCommaInCurrency(
                                        productItem?.productSize?.[0]
                                          ?.productActualPrice
                                      )
                                    : addCommaInCurrency(
                                        productItem.productActualPrice
                                      )}
                                </span>
                                <span className="new-price">
                                  ₹
                                  {productItem?.isSize
                                    ? addCommaInCurrency(
                                        productItem?.productSize?.[0]
                                          ?.productOfferPrice
                                      )
                                    : addCommaInCurrency(
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

            {/*************** Pagination ********************/}
            {totalPages > 1 && (
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center mt-0 mb-3 mb-lg-0 mt-lg-3">
                  {/* {paginationCurrentPage === 1 ? (
                    <li className="page-item disabled">
                      <span className="page-link">Previous</span>
                    </li>
                  ) : (
                    <li className="page-item pointer">
                      <a
                        className="page-link"
                        onClick={() =>
                          setPaginationCurrentPage(paginationCurrentPage - 1)
                        }
                      >
                        Previous
                      </a>
                    </li>
                  )} */}
                  <CustomPagination
                    currentPage={paginationCurrentPage}
                    totalPages={totalPages}
                    onPageChange={(newPage: any) =>
                      setPaginationCurrentPage(newPage)
                    }
                  />
                  {/* {paginationCurrentPage === totalPages ? (
                    <li className="page-item disabled">
                      <span className="page-link">Next</span>
                    </li>
                  ) : (
                    <li className="page-item pointer">
                      <a
                        className="page-link"
                        onClick={() =>
                          setPaginationCurrentPage(paginationCurrentPage + 1)
                        }
                      >
                        Next
                      </a>
                    </li>
                  )} */}
                </ul>
              </nav>
            )}
          </>
        )}

        {loading && <ProductListingLoader />}
      </div>
    </div>
  );
};

export default ProductListing;
