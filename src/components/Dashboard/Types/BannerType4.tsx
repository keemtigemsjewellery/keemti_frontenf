import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { four_col_slider } from "./SliderConfig";
import { redirectURL } from "utils/helper/helper";

import { BANNER_ROUTE } from "utils/api/routes/clientRoute";

interface BannerType4Model {
  bannerItem: any;
}

const BannerType4 = ({ bannerItem }: BannerType4Model) => {
  // console.log(bannerItem, "jerry");
  const navigate = useNavigate();

  return (
    <section className="gift-love section-space">
      <div className="container">
        <div className="section-title text-center">
          <h2>{bannerItem?.title}</h2>
          <p>{bannerItem?.subTitle}</p>
        </div>

        <Slider {...four_col_slider} className="gift-love-slider">
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
                <div className="item-inner text-center">
                  <div className="slide-block">
                    <img src={bannerValue.fileUrl} />
                    <div className="product-detail">
                      <a className="style">{bannerValue.subTitle}</a>
                      <h4>{bannerValue.title}</h4>
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

export default BannerType4;
