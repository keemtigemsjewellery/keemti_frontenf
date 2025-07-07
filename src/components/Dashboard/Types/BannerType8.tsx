import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { three_col_slider } from "./SliderConfig";
import { redirectURL } from "utils/helper/helper";

import { BANNER_ROUTE } from "utils/api/routes/clientRoute";

interface BannerType8Model {
  bannerItem: any;
}

const BannerType8 = ({ bannerItem }: BannerType8Model) => {
  // console.log(bannerItem, "jerry");
  const navigate = useNavigate();

  return (
    <section className="pt-4 section-space">
      <div className="container">
        <Slider {...three_col_slider} className="category-square-slider">
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
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default BannerType8;
