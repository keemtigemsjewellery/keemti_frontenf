import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";

import ImageGalleryLoader from "./Loader/ImageGalleryLoader";

interface ImageGalleryModel {
  loading: boolean;
  productDetailsData: any;
}

const ImageGalleryLeftSide = ({
  loading,
  productDetailsData,
}: ImageGalleryModel) => {
  const { productSlug } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState<any[]>([]);

  const [isMagnifierOpen, setIsMagnifierOpen] = useState(false);
  const [magnifierImage, setMagnifierImage] = useState();
  const [cordX, setCordX] = useState<any>();
  const [cordY, setCordY] = useState<any>();

  useEffect(() => {
    if (productDetailsData?.productGallery) {
      const sliderImageData = productDetailsData?.productGallery.map(
        (productImg: any) => {
          if (productImg.type !== "image") {
            return {
              thumbnail:
                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMzOTNhM2Q7fS5jbHMtMntmaWxsOm5vbmU7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT4zNjA8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNLjgzLDEwLjkzbDAtLjE3YTIuMzUsMi4zNSwwLDAsMSwuNzctMS4zMkE2LjYyLDYuNjIsMCwwLDEsMy44LDguMTZMNC4xNyw4YS4yLjIsMCwwLDEsLjExLDAsLjE3LjE3LDAsMCwxLC4xOS4xMmMwLC4xLDAsLjE1LS4xMi4xOS0uMy4xNC0uNi4yNi0uODkuNDFhMy43NiwzLjc2LDAsMCwwLTEuMjUsMSwxLjU4LDEuNTgsMCwwLDAsMCwyLjA2LDMuOTQsMy45NCwwLDAsMCwxLjI0LDEsMTAuMDcsMTAuMDcsMCwwLDAsMi45LDFjLjU3LjExLDEuMTUuMiwxLjczLjI4LjMxLDAsLjYzLjA1Ljk0LjA4LjA4LDAsLjEyLDAsLjEyLS4xMXMwLS4zMywwLS40OWEuMjIuMjIsMCwwLDEsLjM1LS4yMWwxLjg2LDFhLjIzLjIzLDAsMCwxLDAsLjQybC0xLjg2LDFhLjIyLjIyLDAsMCwxLS4zNS0uMjFjMC0uMTcsMC0uMzQsMC0uNTFTOS4wOCwxNSw5LDE1YTE4LjUzLDE4LjUzLDAsMCwxLTMuNjItLjU1LDExLjE5LDExLjE5LDAsMCwxLTIuNDktLjk0LDQuOTIsNC45MiwwLDAsMS0xLjU2LTEuMjMsMi4xLDIuMSwwLDAsMS0uNDctMS4wOS4yNC4yNCwwLDAsMCwwLS4wOFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xOS4xNywxMS4yMWwwLC4yMWEyLjMsMi4zLDAsMCwxLS43NiwxLjMzLDYuMTYsNi4xNiwwLDAsMS0yLDEuMjMsMTMuNTcsMTMuNTcsMCwwLDEtMy4wOC44MWMtLjIxLDAtLjQzLjA2LS42NC4wOWEuNC40LDAsMCwxLS40OC0uMzIuNDIuNDIsMCwwLDEsLjM3LS40OWMuNi0uMSwxLjItLjE5LDEuNzktLjMzYTguNCw4LjQsMCwwLDAsMi40Ni0xLDMuNDMsMy40MywwLDAsMCwxLjEtMSwxLjU4LDEuNTgsMCwwLDAtLjEtMiw0LjIxLDQuMjEsMCwwLDAtMS4zMS0xbC0uMzktLjJjLS4xMy0uMDYtLjE4LS4xNC0uMTQtLjI0YS4yMS4yMSwwLDAsMSwuMjgtLjA3Yy4zOC4xOC43Ny4zNiwxLjE1LjU2YTQuNjQsNC42NCwwLDAsMSwxLC43OCwyLjI5LDIuMjksMCwwLDEsLjc0LDEuNDUuMTQuMTQsMCwwLDAsMCwuMDZaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTYuNzgsNy4zOGEuOTQuOTQsMCwwLDEtMS0xLDEsMSwwLDAsMSwxLS45NSwxLDEsMCwwLDEsMSwuOTVBMSwxLDAsMCwxLDE2Ljc4LDcuMzhabTAtMS40N2EuNTMuNTMsMCwwLDAsMCwxLC41MS41MSwwLDAsMCwuNDgtLjUzQS41LjUsMCwwLDAsMTYuNzksNS45MVoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00LjU4LDkuODdsLjYxLS41OGExLjIxLDEuMjEsMCwwLDAsMSwuNDguNTEuNTEsMCwwLDAsLjU3LS40OGgwYzAtLjMzLS4zLS41MS0uNzktLjUxSDUuNTdsLS4xNC0uNTYsMS0xSDQuODJWNi41SDcuNTF2LjY2bC0xLDFBMS4xMSwxLjExLDAsMCwxLDcuNTgsOS4yNGgwYTEuMywxLjMsMCwwLDEtMS40NCwxLjMxQTIsMiwwLDAsMSw0LjU4LDkuODdaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNOC42OSwxMC4xM2EyLDIsMCwwLDEtLjQ3LTEuNTFoMGMwLTEuMjQuNTYtMi4xOCwxLjc1LTIuMThhMS44NSwxLjg1LDAsMCwxLDEuMjUuNDRsLS40Ni42OGExLjI0LDEuMjQsMCwwLDAtLjgyLS4zMmMtLjQ5LDAtLjc1LjQtLjguOTJBMS4zNywxLjM3LDAsMCwxLDEwLDcuODlhMS4yNiwxLjI2LDAsMCwxLDEuNDEsMS4yOGgwYTEuNDIsMS40MiwwLDAsMS0xLjUzLDEuMzhBMS41MiwxLjUyLDAsMCwxLDguNjksMTAuMTNabTEuODEtLjkxaDBhLjYyLjYyLDAsMCwwLS43LS41OWMtLjQzLDAtLjY5LjI0LS42OS41OGgwYS42Mi42MiwwLDAsMCwuNy42QS42MS42MSwwLDAsMCwxMC41LDkuMjJaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTIsOC41aDBhMS44NywxLjg3LDAsMCwxLDEuNzgtMi4wNiwxLjg2LDEuODYsMCwwLDEsMS43NywyLjA1aDBhMS44OCwxLjg4LDAsMCwxLTEuNzgsMi4wN0ExLjg2LDEuODYsMCwwLDEsMTIsOC41Wm0yLjY1LDBoMGMwLS43Mi0uMzYtMS4yNy0uODgtMS4yN3MtLjg3LjUzLS44NywxLjI2aDBjMCwuNzMuMzUsMS4yOC44OCwxLjI4UzE0LjY1LDkuMjMsMTQuNjUsOC41WiIvPjwvZz48L2c+PC9zdmc+",
              renderItem: () => (
                <div>
                  <video controls autoPlay className="w-100 ">
                    <source src={productImg.url} type="video/mp4" />
                  </video>
                </div>
              ),
            };
          }
          return {
            original: productImg.url,
            thumbnail: productImg.url,
          };
        }
      );

      setSliderImages([...sliderImageData]);
    }
  }, [productDetailsData, productSlug]);

  const handleThumbnailNavigation = (direction: any) => {
    let newIndex = currentIndex;

    if (direction === "prev") {
      newIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
    } else if (direction === "next") {
      newIndex = (currentIndex + 1) % sliderImages.length;
    }

    setCurrentIndex(newIndex);
  };

  const renderThumbInner = (item: any, type: any) => {
    return (
      <div className="thumbnail-container adhg">
        <img src={item.thumbnail} alt={item.originalAlt} />
      </div>
    );
  };

  const onMouseOverHandler = (e: any, imageUrl: any) => {
    setIsMagnifierOpen(true);
    setMagnifierImage(imageUrl);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const finalXCord = (x / e.currentTarget.naturalWidth) * 100;
    const finalYCord = (y / e.currentTarget.naturalHeight) * 100;

    setCordX(finalXCord);
    setCordY(finalYCord);
  };

  return (
    <div className="col-md-12 col-lg-6 col-xl-7">
      {!loading && sliderImages.length > 0 && (
        <div className="prodetail-left">
          <div className="image-gallery-container">
            <div className="thumbnail-navigation">
              <span
                className="icon-left-arrow"
                onClick={() => handleThumbnailNavigation("prev")}
              >
                <i className="fas fa-chevron-left"></i>
              </span>

              <div className="thumbnail-array">
                {isMagnifierOpen && (
                  <div id="img-zoom" className="img-zoom-result">
                    <div
                      style={{
                        backgroundImage: `url(${magnifierImage})`,
                        backgroundPosition: `${cordX}% ${cordY}%`,
                      }}
                    ></div>
                  </div>
                )}
                <ImageGallery
                  items={sliderImages as any}
                  startIndex={currentIndex}
                  showThumbnails={true}
                  showNav={false}
                  showPlayButton={false}
                  renderThumbInner={renderThumbInner as any}
                  showFullscreenButton={false}
                  renderItem={(item: any) => {
                    return (
                      <img
                        className="cursor-default"
                        onMouseMove={(e) =>
                          onMouseOverHandler(e, item.original)
                        }
                        src={item.original}
                        alt={item.originalAlt}
                        onMouseOut={() => setIsMagnifierOpen(false)}
                      />
                    );
                    // }
                  }}
                />
              </div>
              <span
                className="icon-right-arrow"
                onClick={() => handleThumbnailNavigation("next")}
              >
                <i className="fas fa-chevron-right"></i>
              </span>
            </div>
          </div>
        </div>
      )}

      {(loading || sliderImages.length === 0) && <ImageGalleryLoader />}
    </div>
  );
};

export default ImageGalleryLeftSide;
