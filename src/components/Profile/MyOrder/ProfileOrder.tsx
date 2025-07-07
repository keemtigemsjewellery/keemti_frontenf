import { useLocation, useNavigate } from "react-router-dom";

import listproduct4 from "../../../assets/images/list-product-img4.png";
import { PRODUCT_ROUTE, PROFILE_ROUTE } from "utils/api/routes/clientRoute";
import { useEffect, useState } from "react";
import { getAllOrdersAPI } from "utils/api/service/orderService";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAction, getOrdersData } from "store/slices/orderSlice";
import {
  addCommaInCurrency,
  orderDetailsDateConverter,
  scrollToTop,
} from "utils/helper/helper";
import { SuccessWithButtonSweetAlert } from "utils/hooks/SweetAlert";
import CustomPagination from "components/Common/CustomPagination";
import { onCheckoutEmptyCartAction } from "store/slices/cartSlice";

const ProfileOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { allOrders } = useSelector(getOrdersData);

  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);

  useEffect(() => {
    const getOrderHandler = async () => {
      try {
        const { data } = await getAllOrdersAPI(paginationCurrentPage);
        dispatch(getAllOrdersAction(data?.data));
      } catch {
        console.log("Unable to get all orders");
      }
    };
    getOrderHandler();
    scrollToTop();
  }, [paginationCurrentPage]);

  const deliveryHeadingHandler = (date: any) => {
    const givenDate = new Date(`${date}`);
    const currentDate = new Date();

    return givenDate > currentDate ? true : false;
  };

  useEffect(() => {
    if (location.search === "?success=true") {
      SuccessWithButtonSweetAlert({
        title: "Payment successful !!",
        timer: 3000,
      });

      dispatch(onCheckoutEmptyCartAction());

      setTimeout(() => {
        navigate(PROFILE_ROUTE.PROFILE_ORDER);
      }, 3000);
    }
  }, []);

  return (
    <>
      <div className="col-md-12 col-lg-8 col-xl-9">
        <div className="accountpage-right white-bg white-boxbg">
          <div className="head withbreadcrumb">
            <h3>My Orders</h3>
            {allOrders && allOrders?.totalDocs > 0 && (
              <p className="mb-3 mb-sm-0">
                Found {allOrders?.totalDocs} results
              </p>
            )}
          </div>
          {allOrders && allOrders?.totalDocs > 0 && (
            <div className="order-wrap">
              {allOrders?.docs?.length > 0 &&
                allOrders?.docs?.map((orderItem: any) => (
                  <div className="order-box" key={orderItem._id}>
                    <div className="order-top d-flex justify-content-between flex-wrap">
                      <div className="d-flex align-items-center">
                        <p>Order ID: {orderItem.orderId}</p>
                        <button
                          className={`payment-status ${
                            orderItem?.paymentStatus === "paid"
                              ? "success"
                              : "failed"
                          }`}
                        >
                          {orderItem?.paymentStatus === "paid"
                            ? "Success"
                            : "Failed"}
                        </button>
                      </div>
                      <span>
                        <a
                          className="pointer"
                          onClick={() =>
                            navigate(
                              `${PROFILE_ROUTE.PROFILE_ORDER_DETAILS.replace(
                                ":orderId",
                                `${orderItem?.orderDetails?.orderIdString}`
                              )}`
                            )
                          }
                        >
                          Order Details
                        </a>
                      </span>
                    </div>
                    <div className="order-bottom-wrapper">
                      {orderItem?.orderDetails?.productDetails &&
                        orderItem?.orderDetails?.productDetails?.length > 0 &&
                        orderItem?.orderDetails?.productDetails?.map(
                          (productItem: any) => (
                            <div
                              className="order-bottom d-flex flex-wrap"
                              key={productItem._id}
                            >
                              <div className="d-flex">
                                <div className="img">
                                  <img 
                                    src={
                                      productItem?.productImage ?? listproduct4
                                    }
                                    alt="list"
                                  />
                                </div>
                                <div className="order-details-text">
                                  <div className="txt mx-0">
                                    <span className="text-uppercase">
                                      {productItem?.productCategory}
                                    </span>
                                    <h6>{productItem?.productTitle}</h6>
                                  </div>
                                  <div className="price mt-0 order-price">
                                    <span>
                                      ₹
                                      {addCommaInCurrency(
                                        `${productItem?.productActualPrice}`
                                      )}
                                    </span>
                                    <h3>
                                      ₹
                                      {addCommaInCurrency(
                                        `${productItem?.productOfferPrice}`
                                      )}
                                    </h3>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="estimate-delivery mt-2 mt-md-0">
                                  <span className="text-center">
                                    {deliveryHeadingHandler(
                                      orderItem?.orderDetails?.deliveryDate
                                    ) === true
                                      ? "Estimated Delivery By"
                                      : "Delivered"}
                                  </span>
                                  <span className="date">
                                    {orderDetailsDateConverter(
                                      orderItem?.orderDetails?.deliveryDate
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {allOrders && allOrders?.totalDocs === 0 && (
            <div className="head withbreadcrumb ps-0 ps-sm-5 pt-3 pt-sm-4">
              <i
                className="fal fa-exclamation-circle"
                style={{ fontSize: "40px" }}
              ></i>
              <h3 className="mt-3 mb-2">No active orders</h3>
              <p className="mb-2">There is no recent product to show.</p>
              <p className="mb-3">
                Choose from 100+ trendy, lightweight and affordable designer
                pieces!
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
          {/*************** Pagination ********************/}
          {allOrders && allOrders?.totalPages > 1 && (
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
                  totalPages={allOrders?.totalPages}
                  onPageChange={(newPage: any) =>
                    setPaginationCurrentPage(newPage)
                  }
                />
                {/* {paginationCurrentPage === allOrders?.totalPages ? (
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
        </div>
      </div>
    </>
  );
};

export default ProfileOrder;
