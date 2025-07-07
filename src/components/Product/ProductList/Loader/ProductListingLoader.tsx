import Skeleton from "react-loading-skeleton";

const ProductListingLoader = () => {
  const numberOfItems = 16;
  const items = Array.from({ length: numberOfItems }, (_, index) => (
    <div key={index} className="slider-item col-md-6 col-lg-4 col-xl-3">
      <div className="item-inner text-center">
        <div className="slide-block">
          <Skeleton count={1} height={300} />
          <br />
          <Skeleton count={1} />
          <Skeleton count={1} />
          <Skeleton count={1} />
        </div>
      </div>
    </div>
  ));

  return (
    <div className="product-list">
      <div className="product-list-slider row">
        {items}
        {/* <div className="slider-item col-md-6 col-lg-4 col-xl-3">
          <div className="item-inner text-center">
            <div className="slide-block">
              <Skeleton count={1} height={300} />
              <br />
              <Skeleton count={1} />
              <Skeleton count={1} />
              <Skeleton count={1} />
            </div>
          </div>
        </div>
        <div className="slider-item col-md-6 col-lg-4 col-xl-3">
          <div className="item-inner text-center">
            <div className="slide-block">
              <Skeleton count={1} height={300} />
              <br />
              <Skeleton count={1} />
              <Skeleton count={1} />
              <Skeleton count={1} />
            </div>
          </div>
        </div>
        <div className="slider-item col-md-6 col-lg-4 col-xl-3">
          <div className="item-inner text-center">
            <div className="slide-block">
              <Skeleton count={1} height={300} />
              <br />
              <Skeleton count={1} />
              <Skeleton count={1} />
              <Skeleton count={1} />
            </div>
          </div>
        </div>
        <div className="slider-item col-md-6 col-lg-4 col-xl-3">
          <div className="item-inner text-center">
            <div className="slide-block">
              <Skeleton count={1} height={300} />
              <br />
              <Skeleton count={1} />
              <Skeleton count={1} />
              <Skeleton count={1} />
            </div>
          </div>
        </div> */}

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center mt-0 mb-3 mb-lg-0 mt-lg-3">
            <Skeleton count={1} width={300} height={50} />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductListingLoader;
