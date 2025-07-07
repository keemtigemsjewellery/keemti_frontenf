import { useNavigate, useParams } from "react-router-dom";
import listproduct4 from "../../../assets/images/list-product-img4.png";
import { useEffect, useState } from "react";
import {
  addCommaInCurrency,
  headingToSlug,
  orderDetailsDateConverter,
  scrollToTop,
  wordCapitalize,
} from "utils/helper/helper";
import { getOrderDetailsAPI } from "utils/api/service/orderService";
import html2pdf from "html2pdf.js";
import OrderDetailsLoader from "../Loader/OrderDetailsLoader";
import { PRODUCT_ROUTE } from "utils/api/routes/clientRoute";

const ProfileOrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    const getOrderDetailsHandler = async () => {
      const { data } = await getOrderDetailsAPI(orderId!);
      setOrderDetails(data?.data);
    };
    getOrderDetailsHandler();
    scrollToTop();
  }, []);

  const convertLinkToPDF = async (
    awsLink: string,
    orderString: string,
    htmlContent: string
  ) => {
    try {
      const opt = {
        margin: 0,
        filename: `${orderString}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().from(htmlContent).set(opt).save();
    } catch (error) {
      console.error("Error converting link to PDF:", error);
    }
  };

  console.log(orderDetails, "orderDetails");
  return (
    <div>
      <div className="inner-page graybg">
        <div className="order-detail">
          <div className="container">
            <div className="order-detail-inner">
              {orderDetails !== undefined && (
                <div className="invoice">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div
                          className={`col-md-4 col-lg-5 pe-md-5 ${
                            orderDetails?.paymentStatus !== "paid" &&
                            "col-md-6 col-lg-6"
                          }`}
                        >
                          <h4 className="mb-3">Delivery Address</h4>
                          {orderDetails && (
                            <>
                              <h5>
                                {
                                  orderDetails?.orderDetails?.deliveryAddress
                                    ?.fullName
                                }{" "}
                                -{" "}
                                {orderDetails?.orderDetails?.deliveryAddress
                                  ?.mobileNumber ?? ""}
                              </h5>
                              <p className="mb-1">
                                {`${
                                  orderDetails?.orderDetails?.deliveryAddress
                                    ?.streetaddress ?? ""
                                }, ${
                                  orderDetails?.orderDetails?.deliveryAddress
                                    ?.locality
                                }, ${
                                  orderDetails?.orderDetails?.deliveryAddress
                                    ?.landmark
                                }`}
                              </p>
                              <p className="mb-1">
                                {`${orderDetails?.orderDetails?.deliveryAddress?.city}, ${orderDetails?.orderDetails?.deliveryAddress?.state} - ${orderDetails?.orderDetails?.deliveryAddress?.pincode}`}
                              </p>
                              <p className="mb-1">
                                Placed Date :{" "}
                                {`${orderDetailsDateConverter(
                                  orderDetails?.orderDate
                                )}`}
                              </p>
                              <p className="mb-1">
                                Delivery Date :{" "}
                                {`${orderDetailsDateConverter(
                                  orderDetails?.orderDetails?.deliveryDate
                                )}`}
                              </p>
                              <p className="mb-1">
                                Order Status :{" "}
                                <span
                                  style={{ color: "#A02B68", fontSize: "15px" }}
                                >{`${wordCapitalize(
                                  orderDetails?.orderStatus
                                )}`}</span>
                              </p>
                              <p className={`mb-1`}>
                                Delivery Status :{" "}
                                <span
                                  className={`${
                                    orderDetails?.deliveryStatus === "NA" &&
                                    "text-uppercase"
                                  }`}
                                  style={{ color: "#A02B68", fontSize: "15px" }}
                                >
                                  {`${wordCapitalize(
                                    orderDetails?.deliveryStatus
                                  )}`}
                                </span>
                              </p>
                            </>
                          )}
                        </div>
                        <div
                          className={`col-md-4 col-lg-4 py-2 mb-3 py-md-0 ${
                            orderDetails?.paymentStatus !== "paid" &&
                            "col-md-6 col-lg-6"
                          }`}
                        >
                          <h4>Price Breakup</h4>
                          <ul>
                            <li>
                              <span>Product Total</span>
                              <span>
                                ₹
                                {addCommaInCurrency(
                                  `${orderDetails?.totalPrice ?? 0}`
                                )}
                              </span>
                            </li>
                            <li>
                              <span>Product Discount</span>
                              <span className="dis-rate">
                                ₹
                                {addCommaInCurrency(
                                  `${orderDetails?.discountPrice ?? 0}`
                                )}
                              </span>
                            </li>
                            <li>
                              <span>Coupon Discount</span>
                              <span className="dis-rate">
                                ₹
                                {addCommaInCurrency(
                                  `${
                                    orderDetails?.couponCodeDiscountPrice ?? 0
                                  }`
                                )}
                              </span>
                            </li>
                            <li>
                              <span>Shipping Charges</span>
                              <span style={{ color: "#A02B68" }}>
                                ₹
                                {addCommaInCurrency(
                                  `${orderDetails?.shippingCharges ?? 0}`
                                )}
                              </span>
                            </li>
                            <li>
                              <span>Total Amount</span>
                              <span>
                                ₹
                                {addCommaInCurrency(
                                  `${orderDetails?.totalPayablePrice ?? 0}`
                                )}
                              </span>
                            </li>
                          </ul>
                        </div>
                        {orderDetails?.paymentStatus === "paid" && (
                          <div className="col-md-4 col-lg-3 text-start text-md-end">
                            <h4>Order Number</h4>
                            <span>
                              {orderDetails?.orderDetails?.orderIdString}
                            </span>
                            <h4 className="mt-3">Payment Method</h4>
                            <span>Paid via Cards</span>
                            <div className="invoice-btn mt-3">
                              <a
                                className={`secondary-btn h-auto cursor-pointer ${
                                  orderDetails?.invoice === undefined &&
                                  "pointer-event-none"
                                }`}
                                onClick={() =>
                                  convertLinkToPDF(
                                    orderDetails?.invoice,
                                    orderDetails?.orderDetails?.orderIdString,
                                    orderDetails?.invoiceString
                                  )
                                }
                              >
                                Download Invoice
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {orderDetails !== undefined && (
                <div className="order-status mt-4">
                  {orderDetails?.paymentStatus === "paid" && (
                    <div className="order-status-right mt-3 mb-5">
                      <ul>
                        <li className="order-tracking completed">
                          <span className="is-complete"></span>
                          <a>Ordered</a>
                        </li>
                        <li className="order-tracking completed">
                          <span className="is-complete"></span>
                          <a>Processed</a>
                        </li>
                        {orderDetails?.deliveryStatus === "delayed" && (
                          <li className="order-tracking completed">
                            <span className="is-complete"></span>
                            <a>Delayed</a>
                          </li>
                        )}
                        {orderDetails?.deliveryStatus === "NA" && (
                          <li className="order-tracking completed">
                            <span className="is-complete"></span>
                            <a>Cancelled</a>
                          </li>
                        )}
                        {orderDetails?.deliveryStatus !== "NA" && (
                          <li
                            className={`order-tracking ${
                              orderDetails?.deliveryStatus === "delivered" &&
                              "completed"
                            }`}
                          >
                            <span className="is-complete"></span>
                            <a>Delivered</a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div
                    className={`row ${
                      orderDetails?.paymentStatus === "unpaid" && "mt-3"
                    }`}
                  >
                    {orderDetails?.orderDetails?.productDetails &&
                      orderDetails?.orderDetails?.productDetails?.length > 0 &&
                      orderDetails?.orderDetails?.productDetails?.map(
                        (productItemDetail: any, index: any) => (
                          <div className="col-md-6 mb-3" key={index}>
                            <>
                              {console.log(
                                productItemDetail,
                                "productItemDetail"
                              )}
                            </>
                            <div
                              className="order-status-left pointer"
                              onClick={() =>
                                navigate(
                                  `${PRODUCT_ROUTE.PRODUCT_DETAILS.replace(
                                    ":categorySlug",
                                    `${headingToSlug(
                                      productItemDetail?.productCategory
                                    )}`
                                  ).replace(
                                    ":productSlug",
                                    `${productItemDetail?.productSlug}`
                                  )}`
                                )
                              }
                            >
                              <div className="img">
                                <img 
                                  src={
                                    productItemDetail?.productImage ??
                                    listproduct4
                                  }
                                  alt="list"
                                />
                              </div>
                              <div className="content-wrapper">
                                <div className="txt">
                                  <span className="text-uppercase">
                                    {productItemDetail?.productCategory ?? ""}
                                  </span>
                                  <h6>
                                    {productItemDetail?.productTitle ?? ""}
                                  </h6>
                                  <div className="category">
                                    <span className="label">Gold: </span>
                                    <span>
                                      {productItemDetail?.karat ?? ""}k
                                    </span>
                                  </div>
                                </div>
                                <div className="price">
                                  <span>
                                    ₹{productItemDetail?.productActualPrice}
                                  </span>
                                  <h3>
                                    ₹{productItemDetail?.productOfferPrice}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              )}

              {orderDetails === undefined && <OrderDetailsLoader />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOrderDetail;
