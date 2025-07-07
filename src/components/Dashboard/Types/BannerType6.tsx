import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { three_col_slider } from "./SliderConfig";
import { redirectURL } from "utils/helper/helper";

import { BANNER_ROUTE } from "utils/api/routes/clientRoute";

interface BannerType6Model {
  bannerItem: any;
}

const BannerType6 = ({ bannerItem }: BannerType6Model) => {
  // console.log(bannerItem, "jerry");
  const navigate = useNavigate();

  return (
    <section className="gift-love gift-love2 section-space">
      <div className="container">
        <div className="section-title text-center">
          <h2>{bannerItem?.title}</h2>
          <p>{bannerItem?.subTitle}</p>
        </div>

        <Slider {...three_col_slider} className="gift-love-slider">
          {bannerItem.bannerData &&
            bannerItem.bannerData.length > 0 &&
            bannerItem.bannerData.map((bannerValue: any) => (
              <div className="slider-item" key={bannerValue._id}>
                <div className="item-inner text-center">
                  <div className="slide-block">
                    <img src={bannerValue.fileUrl} />
                    <div className="explore">
                      <h4>{bannerValue?.title}</h4>
                      <p>{bannerValue?.subTitle}</p>
                      <a
                        className="primary-btn pointer"
                        onClick={() =>
                          bannerValue.isDeeplink
                            ? redirectURL(bannerValue.deeplink)
                            : navigate(
                                `${BANNER_ROUTE.BANNER_LISTS.replace(
                                  ":categorySlug",
                                  `${bannerValue.slug}`
                                ).replace(
                                  ":bannerSlug",
                                  `${bannerValue.slug}`
                                )}`
                              )
                        }
                      >
                        EXPLORE
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default BannerType6;
