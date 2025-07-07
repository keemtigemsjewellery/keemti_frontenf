import Skeleton from "react-loading-skeleton";

const WishlistingLoader = () => {
  return (
    <div className="product-list">
      <div className="product-list-slider row">
        <div className="slider-item col-md-6 col-lg-4 col-xl-3 p-5px">
          <div className="item-inner text-center p-0">
            <div className="slide-block">
              <Skeleton count={1} height={300} />
              <br />
              <Skeleton count={1} />
              <Skeleton count={1} />
              <Skeleton count={1} />
            </div>
          </div>
        </div>
        <div className="slider-item col-md-6 col-lg-4 col-xl-3 p-5px">
          <div className="item-inner text-center p-0">
            <div className="slide-block">
              <Skeleton count={1} height={300} />
              <br />
              <Skeleton count={1} />
              <Skeleton count={1} />
              <Skeleton count={1} />
            </div>
          </div>
        </div>
        <div className="slider-item col-md-6 col-lg-4 col-xl-3 p-5px">
          <div className="item-inner text-center p-0">
            <div className="slide-block">
              <Skeleton count={1} height={300} />
              <br />
              <Skeleton count={1} />
              <Skeleton count={1} />
              <Skeleton count={1} />
            </div>
          </div>
        </div>
        <div className="slider-item col-md-6 col-lg-4 col-xl-3 p-5px">
          <div className="item-inner text-center p-0">
            <div className="slide-block">
              <Skeleton count={1} height={300} />
              <br />
              <Skeleton count={1} />
              <Skeleton count={1} />
              <Skeleton count={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistingLoader;
