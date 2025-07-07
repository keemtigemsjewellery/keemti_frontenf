import { useEffect, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

import { getAllMenuWithSubMenuAPI } from "../../../utils/api/service/menuService";
import { getMenuListingAction } from "../../../store/slices/menuSlice";
import { getLocalStorageValue, redirectURL } from "utils/helper/helper";
import { bannerTypeEnum, localStorageEnum } from "utils/enum/enum";
import { getBannersData } from "store/slices/bannerSlice";
import { getUserDetailsAction } from "store/slices/profileSlice";
import {
  getAddressListAPI,
  getProfileDetailsAPI,
} from "utils/api/service/profileServices";
import BottomHeader from "./BottomHeader";
import TopHeader from "./TopHeader";
import {
  getCheckoutAddressAction,
  setAddressList,
} from "store/slices/addressSlice";

import { BANNER_ROUTE } from "../../../utils/api/routes/clientRoute";

const one_col_slider = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  cssEase: "linear",
  vertical: true,
  arrows: false,
  dots: false,
};

const Header = () => {
  const navigate = useNavigate();
  const [isMobileViewSidebarOpen, setIsMobileViewSidebarOpen] = useState(false);

  const token = getLocalStorageValue(localStorageEnum.ACCESS_TOKEN);

  const dispatch = useDispatch();

  const { allBanners } = useSelector(getBannersData);

  useEffect(() => {
    const getAllMenusDataHandler = async () => {
      try {
        const { data } = await getAllMenuWithSubMenuAPI();
        dispatch(getMenuListingAction(data.data));
      } catch {
        console.log("Unable to get All menus data");
      }
    };
    getAllMenusDataHandler();
  }, []);

  useEffect(() => {
    const getProfileDetailsHandler = async () => {
      if (token) {
        const { data } = await getProfileDetailsAPI();
        dispatch(getUserDetailsAction(data.data));

        const getAddressList = async () => {
          try {
            const { data } = await getAddressListAPI();
            dispatch(setAddressList(data.data));

            const checkoutInitialData = data?.data?.map(
              (addressItem: any, index: any) => {
                if (index === 0) {
                  return {
                    id: addressItem._id,
                    checked: true,
                  };
                }
                return {
                  id: addressItem._id,
                  checked: false,
                };
              }
            );

            dispatch(getCheckoutAddressAction(checkoutInitialData));
          } catch (error) {
            console.log(error);
          }
        };
        getAddressList();
      }
    };
    getProfileDetailsHandler();
  }, []);

  return (
    <div>
      <header>
        <div className="top-header">
          {allBanners &&
            allBanners.length > 0 &&
            allBanners.map((bannerItem, index) => (
              <Fragment key={index}>
                {bannerItem.bannerType === bannerTypeEnum.Type1 && (
                  <Slider {...one_col_slider} className="top-header-text-slide">
                    {bannerItem.bannerData &&
                      bannerItem.bannerData.length > 0 &&
                      bannerItem.bannerData.map(
                        (bannerValue: any, index: number) => (
                          <div
                            key={index}
                            className="slider-item"
                            onClick={() => {
                              setIsMobileViewSidebarOpen(false);
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
                                  );
                            }}
                          >
                            <span className="pointer">
                              {bannerValue.subTitle}
                            </span>
                          </div>
                        )
                      )}
                  </Slider>
                )}
              </Fragment>
            ))}
        </div>

        <TopHeader setIsMobileViewSidebarOpen={setIsMobileViewSidebarOpen} />

        <BottomHeader
          isMobileViewSidebarOpen={isMobileViewSidebarOpen}
          setIsMobileViewSidebarOpen={setIsMobileViewSidebarOpen}
        />
      </header>
    </div>
  );
};

export default Header;
