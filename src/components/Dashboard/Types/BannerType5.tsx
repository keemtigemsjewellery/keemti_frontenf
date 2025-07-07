import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { three_col_slider } from "./SliderConfig";
import { redirectURL } from "utils/helper/helper";

import { BANNER_ROUTE } from "utils/api/routes/clientRoute";

interface BannerType5Model {
  bannerItem: any;
}

const BannerType5 = ({ bannerItem }: BannerType5Model) => {
  // console.log(bannerItem, "jerry");
  const navigate = useNavigate();

  return (
    <section className="collection-section exclusive-section section-space section-gray-bg">
      <div className="container">
        <div className="section-title text-center">
          <h2>{bannerItem?.title}</h2>
          <p>{bannerItem?.subTitle}</p>
        </div>
        <Slider {...three_col_slider} className="three-cols-hover-slider">
          {bannerItem.bannerData &&
            bannerItem.bannerData.length > 0 &&
            bannerItem.bannerData.map((bannerValue: any) => (
              <div className="slider-item" key={bannerValue._id}>
                <div className="item-inner text-center">
                  <div className="slide-block pb-0">
                    <img src={bannerValue.fileUrl} />
                    <div className="slider-label slide4-label">
                      <span>{bannerValue?.title}</span>
                    </div>
                    <div className="explore">
                      <h4>{bannerValue?.title}</h4>
                      <p>{bannerValue?.subTitle}</p>
                      <a
                        className="pointer"
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
                        {bannerItem.buttonText}
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

export default BannerType5;
