import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";

import {
  addCommaInCurrency,
  arraytoStringTypeArray,
  getLocalStorageValue,
  wordCapitalize,
} from "utils/helper/helper";

import { AUTH_ROUTE, PROFILE_ROUTE } from "utils/api/routes/clientRoute";
import {
  getAllCouponsAPI,
  getProductDetailsAPI,
} from "utils/api/service/productService";

import { toggleWishListStatusAPI } from "utils/api/service/wishListService";
import {
  addProductToCartAction,
  getAllCouponsAction,
  getCartProductsData,
} from "store/slices/cartSlice";
import { localStorageEnum } from "utils/enum/enum";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface DetailsRightSideModel {
  loading: boolean;
  productDetailsData: any;
  setProductDetailsData: any;
}

const DetailsRightSide = ({
  loading,
  productDetailsData,
  setProductDetailsData,
}: DetailsRightSideModel) => {
  const clean = (html: string) => DOMPurify.sanitize(html);
  const { categorySlug, productSlug } = useParams();

  const token = getLocalStorageValue(localStorageEnum.ACCESS_TOKEN);

  const { allCoupons }: any = useSelector(getCartProductsData);
  const { cartProducts } = useSelector(getCartProductsData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [jewellerySize, setJewellerySize] = useState("");
  const [selectedSizeProductDetails, setSelectedSizeProductDetails] =
    useState<any>({});

  const [filteredSizeObject, setFilteredSizeObject] = useState<any>([]);
  const [isProductExistedInCart, setIsProductExisted] = useState<any>(false);
  const [heartIconActive, setHeartIconActive] = useState(false);

  useEffect(() => {
    if (productDetailsData?.productSize) {
      setFilteredSizeObject(
        productDetailsData?.productSize.filter(
          (obj: any) => obj.size == jewellerySize
        )
      );
    }
  }, [jewellerySize, productDetailsData]);

  useEffect(() => {
    if (productDetailsData?.productSize) {
      setJewellerySize(productDetailsData?.productSize?.[0]?.size ?? "");
      setSelectedSizeProductDetails(productDetailsData?.productSize?.[0] ?? {});
    }
  }, [productDetailsData]);

  useEffect(() => {
    setHeartIconActive(productDetailsData?.isWishlisted ?? false);
  }, [productDetailsData]);

  const wishListHandler = async (id: string, isWishlisted: any) => {
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
      setHeartIconActive(!isWishlisted);
      await toggleWishListStatusAPI(params);

      // Getting product details data and setting up in store
      const { data } = await getProductDetailsAPI(productSlug!);
      setProductDetailsData(data?.data);
    } catch {
      setHeartIconActive(!isWishlisted);
      console.log("Unable to update wishlist");
    }
  };

  const addToCartHandler = () => {
    if (!token) {
      navigate(AUTH_ROUTE.LOGIN);
      return <></>;
    }

    if (isProductExistedInCart) {
      navigate(PROFILE_ROUTE.PROFILE_ADD_TO_CART);
      return;
    }

    const cartDetails: any = {
      id: productDetailsData?._id ?? "",
      productTitle: productDetailsData?.productTitle ?? "",
      offerPrice:
        Object.keys(selectedSizeProductDetails).length > 0
          ? selectedSizeProductDetails.productOfferPrice
          : productDetailsData?.productOfferPrice ?? "",
      actualPrice:
        Object.keys(selectedSizeProductDetails).length > 0
          ? selectedSizeProductDetails.productActualPrice
          : productDetailsData?.productActualPrice ?? "",
      productImage: productDetailsData?.productImage ?? "",
      productKarat: productDetailsData?.productKarat ?? "",
      productGram: productDetailsData?.productGram ?? "",
    };

    if (Object.keys(selectedSizeProductDetails).length > 0) {
      cartDetails["productSize"] = selectedSizeProductDetails?.size;
    }

    dispatch(addProductToCartAction(cartDetails));
    navigate(PROFILE_ROUTE.PROFILE_ADD_TO_CART);
  };

  useEffect(() => {
    const isExistIncart =
      cartProducts?.length > 0 &&
      cartProducts.some((cartItem: any) => {
        if (cartItem.id === productDetailsData?._id) {
          return true;
        }
        return false;
      });

    setIsProductExisted(isExistIncart);
  }, [productSlug, productDetailsData]);

  useEffect(() => {
    const getAllCouponsHandler = async () => {
      if (
        productDetailsData?.productSlug === productSlug &&
        productDetailsData?.productStatus === "active"
      ) {
        const productIds: any = [];
        productIds.push(productDetailsData?._id);

        const queryPrams = arraytoStringTypeArray(productIds);

        try {
          const { data } = await getAllCouponsAPI(queryPrams);
          dispatch(getAllCouponsAction(data?.data));
        } catch {
          console.log("Unable to get all coupans");
        }
      } else {
        dispatch(getAllCouponsAction([]));
      }
    };
    getAllCouponsHandler();
  }, [productDetailsData]);

  return (
    <>
      {!loading && productDetailsData && (
        <div className="col-md-12 col-lg-6 col-xl-5">
          <div className="prodetail-right">
            <div className="mb-0">
              <div className="head">
                <h3>{productDetailsData.productTitle}</h3>
                <p className="mb-3 mb-sm-0">
                  From{" "}
                  {productDetailsData.productOccasion &&
                    wordCapitalize(productDetailsData.productOccasion)}{" "}
                  Collection
                </p>
              </div>
              <div className="pricecol">
                <div className="pricecol-left">
                  {Object.keys(selectedSizeProductDetails).length > 0 ? (
                    <h3>
                      {`₹${addCommaInCurrency(
                        `${selectedSizeProductDetails.productOfferPrice} `
                      )}`}
                    </h3>
                  ) : (
                    <h3>
                      {`₹${addCommaInCurrency(
                        productDetailsData.productOfferPrice
                      )}`}
                    </h3>
                  )}

                  {Object.keys(selectedSizeProductDetails).length > 0 ? (
                    <span>
                      {`₹${addCommaInCurrency(
                        `${selectedSizeProductDetails.productActualPrice} `
                      )}`}
                    </span>
                  ) : (
                    <span>
                      {`₹${addCommaInCurrency(
                        productDetailsData.productActualPrice
                      )}`}
                    </span>
                  )}

                  <p className="saving-amount">
                    You are saving{" "}
                    <b>
                      ₹
                      {Object.keys(selectedSizeProductDetails).length > 0 ? (
                        <>
                          {addCommaInCurrency(
                            `${
                              +selectedSizeProductDetails.productActualPrice -
                              +selectedSizeProductDetails.productOfferPrice
                            }`
                          )}
                        </>
                      ) : (
                        <>
                          {addCommaInCurrency(
                            `${
                              +productDetailsData.productActualPrice -
                              +productDetailsData.productOfferPrice
                            }`
                          )}
                        </>
                      )}
                    </b>{" "}
                    on This Product
                  </p>
                </div>
              </div>
              {allCoupons && allCoupons.length > 0 && (
                <div className="availoffer">
                  <Accordion defaultActiveKey={["0"]} alwaysOpen>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Available offers</Accordion.Header>
                      <Accordion.Body>
                        <div className="avail-wrap">
                          {allCoupons?.map((couponItem: any, index: any) => (
                            <div className="avail-box" key={index}>
                              <p>
                                {couponItem.type === "flat" && (
                                  <>
                                    Flat ₹{couponItem.discountPrice} OFF on
                                    minimum ₹{couponItem.minimumOrderValue}{" "}
                                    order value
                                  </>
                                )}
                                {couponItem.type === "percentage" && (
                                  <>
                                    Flat {couponItem.discountPercentage}% OFF on
                                    minimum ₹{couponItem.minimumOrderValue}{" "}
                                    order value
                                  </>
                                )}
                              </p>
                              <p>
                                Coupon code:
                                <a href="#" className="apply">
                                  {couponItem.couponCode}
                                </a>
                              </p>
                            </div>
                          ))}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )}
              <div className="choosekarat">
                <h4 className="font-weight-bold">
                  Gold Caratage : {productDetailsData.productKarat}KT{" "}
                  <span className="fs-13">
                    {" "}
                    {`( ${productDetailsData.productGram}g )`}
                  </span>
                </h4>
              </div>

              {productDetailsData.productGoldColor !== "" && (
                <div className="choosekarat">
                  <h4 className="font-weight-bold">
                    Color :{" "}
                    {wordCapitalize(productDetailsData.productGoldColor ?? "")}
                  </h4>
                </div>
              )}

              {productDetailsData.productSize &&
                productDetailsData.productSize.length > 0 && (
                  <div className="choosekarat">
                    <h4>
                      Select a {categorySlug && categorySlug.slice(0, -1)} size
                    </h4>
                    <div className="radiobox">
                      {productDetailsData.productSize.map(
                        (sizeValue: any, index: any) => (
                          <div className="form-group" key={index}>
                            <input
                              type="radio"
                              id={sizeValue.size}
                              name="radio-group"
                              onChange={() => {
                                setJewellerySize(`${sizeValue.size}`);
                                setSelectedSizeProductDetails(sizeValue);
                              }}
                            />
                            <label
                              htmlFor={sizeValue.size}
                              className={`${
                                jewellerySize === sizeValue.size && "active"
                              }`}
                            >
                              {sizeValue.size}
                            </label>
                            <p className="fs-14 mt-1 mb-0 text-center">
                              {sizeValue.gram} g
                            </p>
                          </div>
                        )
                      )}
                    </div>
                    {filteredSizeObject.length > 0 && (
                      <>
                        <p className="mt-2 mb-0">
                          Diameter{" "}
                          <span className="font-bold">
                            {filteredSizeObject[0].diameter} mm
                          </span>
                        </p>
                        <p>
                          Circumference{" "}
                          <span className="font-bold">
                            {filteredSizeObject[0].circumference} mm
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                )}
              <div className="btn-wrap">
                <a
                  onClick={() => addToCartHandler()}
                  className={`btn primary-btn ${
                    productDetailsData?.productStatus === "inactive" &&
                    "pointer-event-none opacity-06"
                  }`}
                >
                  <i className="fal fa-shopping-bag"></i>
                  {productDetailsData?.productStatus === "inactive" ? (
                    "Out of stock"
                  ) : (
                    <>{isProductExistedInCart ? "Go to Bag" : "Add To Cart"}</>
                  )}
                </a>
                <a
                  onClick={() =>
                    wishListHandler(
                      productDetailsData?._id,
                      productDetailsData?.isWishlisted
                    )
                  }
                  className="border-btn primary-btn cursor-pointer"
                >
                  <i
                    className={
                      heartIconActive
                        ? "wishlist-icon far fa-heart"
                        : "far fa-heart"
                    }
                  ></i>
                  Wishlist
                </a>
              </div>

              <div className="choosekarat mb-3">
                <h4 className="font-weight-bold">Price Breakup</h4>
              </div>

              <div className="availoffer standout-sec">
                <Accordion defaultActiveKey={["2"]} alwaysOpen>
                  <Accordion.Item eventKey="2">
                    <Accordion.Body>
                      <div className="price_breakup">
                        {productDetailsData &&
                          parse(clean(productDetailsData.productPrizeBreakup))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="col-md-12 col-lg-6 col-xl-5">
          <div className="prodetail-right">
            <div className="mb-0">
              <Skeleton count={1} />
              <br />
              <h3>
                <Skeleton count={1} />
              </h3>
              <Skeleton count={1} />
              <br />
              <h3>
                <Skeleton count={1} />
              </h3>
              <Skeleton count={1} /> <Skeleton count={1} />
              <Skeleton count={1} />
              <br />
              <Skeleton count={1} height={150} />
              <br />
              <Skeleton count={1} />
              <Skeleton count={1} />
              <Skeleton count={1} />
            </div>
            <Skeleton count={1} />
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsRightSide;
