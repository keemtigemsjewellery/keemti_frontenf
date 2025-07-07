import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { category_settings1 } from "./SliderConfig";
import { addCommaInCurrency, redirectURL } from "utils/helper/helper";

import { PRODUCT_ROUTE } from "utils/api/routes/clientRoute";

interface BannerType7Model {
  bannerItem: any;
}

const BannerType7 = ({ bannerItem }: BannerType7Model) => {
  // console.log(bannerItem, "jerry");
  const navigate = useNavigate();

  return (
    <section className="category-section section-space">
      <div className="container">
        <div className="section-title text-center">
          <h2>{bannerItem?.title}</h2>
          <p>{bannerItem?.subTitle}</p>
        </div>

        <Slider {...category_settings1} className="category-slider">
          {bannerItem.bannerData &&
            bannerItem.bannerData.productCategoryIds.length > 0 &&
            bannerItem.bannerData.productCategoryIds.map((bannerValue: any) => (
              <div
                className="slider-item pointer"
                key={bannerValue._id}
                onClick={() =>
                  bannerValue.isDeeplink
                    ? redirectURL(bannerValue.deeplink)
                    : navigate(
                        `${PRODUCT_ROUTE.CATEGORY_LISTS.replace(
                          ":categorySlug",
                          `${bannerValue.slug}`
                        ).replace(":bannerSlug", `${bannerValue.slug}`)}`
                      )
                }
              >
                <div className="item-inner text-center">
                  <div className="slide-block">
                    <img  src={bannerValue.productCategoryImage} />
                    <span>
                      <strong>Starts from</strong> ₹
                      {bannerValue.startingFrom !== ""
                        ? addCommaInCurrency(bannerValue.startingFrom)
                        : 0}
                    </span>
                  </div>
                </div>
                <div className="item-title text-center">
                  <h5>{bannerValue?.name}</h5>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default BannerType7;
