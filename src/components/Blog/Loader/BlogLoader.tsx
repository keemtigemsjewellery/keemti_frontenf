import Skeleton from "react-loading-skeleton";

const BlogLoader = () => {
  return (
    <section className="inner-page graybg section-space blog-page pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <Skeleton
              count={1}
              height={500}
              className="w-100"
              baseColor="#FFFFFF"
              highlightColor="#F1F1F1"
            />
          </div>
          <div className="col-lg-4 ps-xl-5 ps-lg-3 mt-4 mt-lg-0">
            <Skeleton
              count={1}
              height={500}
              className="w-100"
              baseColor="#FFFFFF"
              highlightColor="#F1F1F1"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogLoader;
