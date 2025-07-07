import Skeleton from "react-loading-skeleton";

const StandoutLoader = () => {
  return (
    <section className="section-space standout-sec pt-4 pt-md-3 pb-0">
      <div className="container">
        <div className="white-bg white-boxbg">
          <h5>
            <Skeleton count={1} />
          </h5>
          <div className="row">
            <div className="col standout-col">
              <Skeleton count={1} height={50} />
            </div>
            <div className="col standout-col">
              <Skeleton count={1} height={50} />
            </div>
            <div className="col standout-col">
              <Skeleton count={1} height={50} />
            </div>
            <div className="col standout-col">
              <Skeleton count={1} height={50} />
            </div>
            <div className="col standout-col">
              <Skeleton count={1} height={50} />
            </div>
            <div className="col standout-col">
              <Skeleton count={1} height={50} />
            </div>
            <div className="col standout-col">
              <Skeleton count={1} height={50} />
            </div>
            <div className="col standout-col">
              <Skeleton count={1} height={50} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandoutLoader;
