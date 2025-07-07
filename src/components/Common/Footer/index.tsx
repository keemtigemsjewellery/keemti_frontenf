import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { getMenuLevelsData } from "../../../store/slices/menuSlice";
import { redirectURL } from "utils/helper/helper";

import axiosInstance from "../../../../src/utils/api/axiosInstance";
import { SETTING_ROUTE } from "../../../../src/utils/api/routes/serverRoute";
import { FOOTER_ROUTE } from "utils/api/routes/clientRoute";

import footer_bg from "../../../assets/images/footer-bg.jpg";
import { getGlobalSettingsData } from "store/slices/profileSlice";

export const getAllSettingsAPI = () => {
  return axiosInstance.get(`${SETTING_ROUTE.GET_GLOBAL_SETTINGS}`);
};

const Footer = () => {
  const footerData = useSelector(getMenuLevelsData);
  const globalSetting = useSelector(getGlobalSettingsData);
  const navigate = useNavigate();

  return (
    <div>
      <footer style={{ backgroundImage: "url(" + footer_bg + ")" }}>
        <div className="container">
          <div className="footer-top">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-3 mb-4 footer-logo-widget pe-lg-5">
                <a
                  href="/"
                  className="d-flex align-items-center mb-3 link-dark text-decoration-none"
                >
                  <img src={globalSetting?.logoImage} alt="Footer logo" />
                </a>

                <p>{globalSetting?.tagLine ?? ""}</p>

                <ul className="list-unstyled d-flex footer-social">
                  <li className="me-3">
                    <a
                      title="Facebook"
                      target="blank"
                      href={globalSetting?.facebookLink}
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="me-3">
                    <a
                      title="Youtube"
                      target="blank"
                      href={globalSetting?.youtubeLink}
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                  <li className="me-3">
                    <a
                      title="Instagram"
                      target="blank"
                      href={globalSetting?.instaLink}
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      title="Linkdin"
                      target="blank"
                      href={globalSetting?.linkdinLink}
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
              {footerData &&
                footerData.level3 &&
                footerData.level3.length > 0 && (
                  <>
                    {footerData.level3.map((footerItem, index) => (
                      <React.Fragment key={index}>
                        {footerItem.footerMenuLevel === "vertical" && (
                          <div className="col-6 col-md-3 col-lg-2 mb-3 footer-widget">
                            <h5
                              className="cursor-pointer"
                              onClick={() =>
                                footerItem?.menu?.isMenuDeeplink
                                  ? redirectURL(footerItem?.menu.deepLink)
                                  : navigate(
                                      `${FOOTER_ROUTE.LINKS.replace(
                                        ":footerMenu",
                                        `${footerItem?.menu?.slug}`
                                      ).replace(
                                        ":footerSubmenu",
                                        `${footerItem?.menu?.slug}`
                                      )}`,
                                      {
                                        state: {
                                          value: footerItem?.menu,
                                        },
                                      }
                                    )
                              }
                            >
                              {footerItem?.menu?.menuName}
                            </h5>
                            <ul className="nav flex-column">
                              {footerItem?.subMenu?.length > 0 &&
                                footerItem?.subMenu?.map((item, index) => (
                                  <li key={index} className="cursor-pointer">
                                    <a
                                      onClick={() =>
                                        item.isMenuDeeplink
                                          ? redirectURL(item.deepLink)
                                          : navigate(
                                              `${FOOTER_ROUTE.LINKS.replace(
                                                ":footerMenu",
                                                `${footerItem?.menu?.slug}`
                                              ).replace(
                                                ":footerSubmenu",
                                                `${item?.slug}`
                                              )}`,
                                              {
                                                state: {
                                                  value: item,
                                                },
                                              }
                                            )
                                      }
                                      title={item.menuName}
                                    >
                                      {item?.menuName}
                                    </a>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                )}
            </div>
          </div>

          <div className="footer-searches">
            <div className="search-block">
              <h4>POPULAR SEARCHES</h4>
              <ul className="category-ul">
                {footerData &&
                  footerData.level3 &&
                  footerData.level3.length > 0 && (
                    <>
                      {footerData.level3.map((footerItem, index) => (
                        <React.Fragment key={index}>
                          {footerItem.footerMenuLevel === "horizontal" && (
                            <li className="category-li">
                              <h6
                                className="cursor-pointer"
                                onClick={() =>
                                  footerItem?.menu?.isMenuDeeplink
                                    ? redirectURL(footerItem?.menu.deepLink)
                                    : navigate(
                                        `${FOOTER_ROUTE.LINKS.replace(
                                          ":footerMenu",
                                          `${footerItem?.menu?.slug}`
                                        ).replace(
                                          ":footerSubmenu",
                                          `${footerItem?.menu?.slug}`
                                        )}`,
                                        {
                                          state: {
                                            value: footerItem?.menu,
                                          },
                                        }
                                      )
                                }
                              >
                                {footerItem?.menu?.menuName}
                              </h6>
                              <ul key={index}>
                                {footerItem?.subMenu?.length > 0 &&
                                  footerItem?.subMenu?.map((item, index) => (
                                    <li key={index} className="cursor-pointer">
                                      <a
                                        onClick={() =>
                                          item.isMenuDeeplink
                                            ? redirectURL(item.deepLink)
                                            : navigate(
                                                `${FOOTER_ROUTE.LINKS.replace(
                                                  ":footerMenu",
                                                  `${footerItem?.menu?.slug}`
                                                ).replace(
                                                  ":footerSubmenu",
                                                  `${item?.slug}`
                                                )}`,
                                                {
                                                  state: {
                                                    value: item,
                                                  },
                                                }
                                              )
                                        }
                                        title={item.menuName}
                                      >
                                        {item?.menuName}
                                      </a>
                                    </li>
                                  ))}
                              </ul>
                            </li>
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  )}
              </ul>
            </div>
          </div>

          <div className="copyright">
            {globalSetting?.copyright && <p>{globalSetting?.copyright}</p>}
            {!globalSetting?.copyright && (
              <p>
                &copy; {new Date().getFullYear() ?? ""} All rights reserved.
              </p>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
