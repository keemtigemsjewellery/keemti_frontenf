import Skeleton from "react-loading-skeleton";

const ImageGalleryLoader = () => {
  return (
    <div className="prodetail-left">
      <div className="image-gallery-container">
        <div className="thumbnail-navigation">
          <div className="thumbnail-array">
            <div className="skeleton-image-gallery">
              <Skeleton count={1} className="skeleton" />
            </div>
            <div className="d-flex justify-content-center">
              <div className="mt-2 me-1">
                <Skeleton count={1} height={100} width={100} />
              </div>
              <div className="mt-2 ms-1 me-1">
                <Skeleton count={1} height={100} width={100} />
              </div>
              <div className="mt-2 ms-1">
                <Skeleton count={1} height={100} width={100} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryLoader;
