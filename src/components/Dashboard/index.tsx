import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getDashboardBannersAPI } from "utils/api/service/dashboardService";
import { getAllBannersAction, getBannersData } from "store/slices/bannerSlice";

import BannerType9 from "./Types/BannerType9";
import BannerType8 from "./Types/BannerType8";
import BannerType7 from "./Types/BannerType7";
import BannerType4 from "./Types/BannerType4";
import BannerType6 from "./Types/BannerType6";
import BannerType5 from "./Types/BannerType5";
import BannerType3 from "./Types/BannerType3";
import BannerType2 from "./Types/BannerType2";
import { bannerTypeEnum } from "utils/enum/enum";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allBanners }: any = useSelector(getBannersData);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getDashboardBannersAPI();
        dispatch(getAllBannersAction(data.data));
      } catch {
        console.log("Unable to get All menus data");
      }
    })();
  }, []);

  return (
    <div>
      <div className="home-page">
        {allBanners &&
          allBanners.length > 0 &&
          allBanners.map((bannerItem: any, index: any) => {
            const bannerSelection = (constantType: string) => {
              return bannerItem.bannerType === constantType;
            };

            return (
              <Fragment key={index}>
                {bannerSelection(bannerTypeEnum.Type2) && (
                  <BannerType2 bannerItem={bannerItem} />
                )}
                {bannerSelection(bannerTypeEnum.Type7) && (
                  <BannerType7 bannerItem={bannerItem} />
                )}
                {bannerSelection(bannerTypeEnum.Type8) && (
                  <BannerType8 bannerItem={bannerItem} />
                )}
                {bannerSelection(bannerTypeEnum.Type3) && (
                  <BannerType3 bannerItem={bannerItem} />
                )}
                {bannerSelection(bannerTypeEnum.Type4) && (
                  <BannerType4 bannerItem={bannerItem} />
                )}
                {bannerSelection(bannerTypeEnum.Type9) && (
                  <BannerType9 bannerItem={bannerItem} />
                )}
                {bannerSelection(bannerTypeEnum.Type5) && (
                  <BannerType5 bannerItem={bannerItem} />
                )}
                {bannerSelection(bannerTypeEnum.Type6) && (
                  <BannerType6 bannerItem={bannerItem} />
                )}
              </Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
