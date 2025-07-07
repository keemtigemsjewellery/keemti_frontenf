import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { one_col_slider } from "./SliderConfig";
import { redirectURL } from "utils/helper/helper";
import { BANNER_ROUTE } from "utils/api/routes/clientRoute";

interface BannerType2Model {
  bannerItem: any;
}

const BannerType2 = ({ bannerItem }: BannerType2Model) => {
  // console.log(bannerItem, "jerry");
  const navigate = useNavigate();

  return (
    <div className="banner">
      <div className="banner-slider">
        <Slider {...one_col_slider}>
          {bannerItem.bannerData &&
            bannerItem.bannerData.length > 0 &&
            bannerItem.bannerData.map((bannerValue: any) => (
              <div
                className="slider-item pointer"
                key={bannerValue._id}
                onClick={() =>
                  bannerValue.isDeeplink
                    ? redirectURL(bannerValue.deeplink)
                    : navigate(
                        `${BANNER_ROUTE.BANNER_LISTS.replace(
                          ":categorySlug",
                          `${bannerValue.slug}`
                        ).replace(":bannerSlug", `${bannerValue.slug}`)}`
                      )
                }
              >
                <img src={bannerValue.fileUrl} alt={bannerValue._id} />
              </div>
            ))}
        </Slider>
      </div>

      <div className="banner-content">
        <div className="container">
          <div className="banner-box">
            <div className="row">
              <div className="col-3 col-md-6 col-xl-3">
                <div className="banner-contnet-block">
                  <span className="mobile_icon">
                    <i className="fad fa-triangle"></i>
                  </span>
                  <h5>Free Delivery</h5>
                  <p>Free shipping on all order</p>
                </div>
              </div>
              <div className="col-3 col-md-6 col-xl-3">
                <div className="banner-contnet-block">
                  <span className="mobile_icon">
                    <i className="far fa-headset"></i>
                  </span>
                  <h5>Online Support 24/7</h5>
                  <p>Support online 24 hours a day</p>
                </div>
              </div>
              <div className="col-3 col-md-6 col-xl-3">
                <div className="banner-contnet-block">
                  <span className="mobile_icon">
                    <i className="far fa-undo-alt"></i>
                  </span>
                  <h5>Money Return</h5>
                  <p>Back guarantee under 7 days</p>
                </div>
              </div>
              <div className="col-3 col-md-6 col-xl-3">
                <div className="banner-contnet-block">
                  <span className="mobile_icon">
                    <i className="far fa-badge-percent"></i>
                  </span>
                  <h5>Member Discount</h5>
                  <p>On every order 5% discount</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerType2;
