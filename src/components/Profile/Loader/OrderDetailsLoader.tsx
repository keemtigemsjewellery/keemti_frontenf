import Skeleton from "react-loading-skeleton";

const OrderDetailsLoader = () => {
  return (
    <div className="invoice">
      <div className="row">
        <div className="col-md-4 col-lg-5 pe-md-5 col-md-6 col-lg-6">
          <Skeleton count={1} height={20} />
          <Skeleton count={1} height={20} />
          <Skeleton count={1} height={20} />
          <Skeleton count={1} height={20} />
          <Skeleton count={1} height={20} />
        </div>
        <div className="col-md-4 col-lg-4 py-2 mb-3 py-md-0 col-md-6 col-lg-6">
          <Skeleton count={1} height={20} />
          <Skeleton count={1} height={20} />
          <Skeleton count={1} height={20} />
          <Skeleton count={1} height={20} />
          <Skeleton count={1} height={20} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsLoader;
