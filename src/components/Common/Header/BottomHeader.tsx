import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";

import {
  PRODUCT_ROUTE,
  HEADER_TOPBAR_ROUTE,
  BLOG_ROUTE,
} from "utils/api/routes/clientRoute";
import {
  redirectURL,
  returnPathnameOnly,
  wordCapitalize,
} from "utils/helper/helper";
import { getAllCategoriesAPI } from "utils/api/service/productService";
import { getMenuLevelsData } from "store/slices/menuSlice";

import all_jwelerry from "../../../assets/images/all-jwellery.svg";

interface BottomHeaderModel {
  isMobileViewSidebarOpen: any;
  setIsMobileViewSidebarOpen: any;
}
const BottomHeader = ({
  isMobileViewSidebarOpen,
  setIsMobileViewSidebarOpen,
}: BottomHeaderModel) => {
  const navigate = useNavigate();
  const menuLevelsData = useSelector(getMenuLevelsData);

  const [allCategory, setAllCategory] = useState<any>();
  const [sidebarMenus, setSidebarMenus] = useState("");

  useEffect(() => {
    const getAllCategoriesHandler = async () => {
      const { data } = await getAllCategoriesAPI();
      setAllCategory(data?.data);
    };
    getAllCategoriesHandler();
  }, []);

  const baseURL = `${process.env.REACT_APP_BASE_URL}`;

  return (
    <nav className="navbar navbar-menu navbar-expand-lg p-0">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMobileViewSidebarOpen(!isMobileViewSidebarOpen)}
        >
          {!isMobileViewSidebarOpen ? (
            <span className="navbar-toggler-icon"></span>
          ) : (
            <i className="fal fa-times" style={{ fontSize: "25px" }}></i>
          )}
        </button>
        <div
          className={`collapse navbar-collapse justify-content-between ${
            isMobileViewSidebarOpen && "show"
          }`}
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li>
              <Dropdown className="all-jwellery">
                <Dropdown.Toggle
                  onKeyDown={(e: any) => e.stopPropagation()}
                  className="box-shadow-none"
                >
                  <img src={all_jwelerry} alt="All Jwellery" className="me-3" />
                  <span
                    onClick={() => {
                      setIsMobileViewSidebarOpen(false);
                      navigate(PRODUCT_ROUTE.PRODUCT_LISTING_ALL_PRODUCTS);
                    }}
                  >
                    All Jewellery
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {allCategory &&
                    allCategory?.length > 0 &&
                    allCategory?.map((allCategoriesItem: any, index: any) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          setIsMobileViewSidebarOpen(false);
                          allCategoriesItem.isDeeplink
                            ? redirectURL(allCategoriesItem.deeplink)
                            : navigate(
                                `${PRODUCT_ROUTE.CATEGORY_LISTS.replace(
                                  ":categorySlug",
                                  `${allCategoriesItem.slug}`
                                ).replace(
                                  ":bannerSlug",
                                  `${allCategoriesItem.slug}`
                                )}`
                              );
                        }}
                      >
                        <span>
                          <img
                            className="w-100"
                            src={allCategoriesItem?.productCategoryImage}
                            alt="category"
                          />
                        </span>
                        {wordCapitalize(allCategoriesItem?.name ?? "")}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>
            {menuLevelsData.level2 &&
              menuLevelsData.level2?.length > 0 &&
              menuLevelsData.level2?.map((item) => (
                <li className="nav-item" key={item?.menu?._id}>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="nav-link"
                      onClick={() => {
                        item?.menu?.isMenuDeeplink ? (
                          <>
                            {item?.menu?.deepLink.includes(baseURL)
                              ? navigate(
                                  returnPathnameOnly(item?.menu?.deepLink)
                                )
                              : redirectURL(`${item?.menu?.deepLink}`)}

                            {/* {navigateString(`${item?.menu?.deepLink}`) !== ""
                              ? navigate(
                                  navigateString(`${item?.menu?.deepLink}`)
                                )
                              : redirectURL(`${item?.menu?.deepLink}`)} */}
                          </>
                        ) : (
                          navigate(
                            `${HEADER_TOPBAR_ROUTE.LINKS.replace(
                              ":navbarHeading",
                              `${item?.menu?.slug}`
                            )}`,
                            { state: item?.menu?.deepLink }
                          )
                        );
                      }}
                    >
                      <span onClick={() => setIsMobileViewSidebarOpen(false)}>
                        {wordCapitalize(item?.menu?.menuName ?? "")}
                      </span>
                      {item?.subMenu?.length > 0 && (
                        <span
                          className={`mobile-dropdown-btn 
                      ${item?.menu?._id === sidebarMenus && "flip"}`}
                          onClick={() =>
                            item?.menu?._id === sidebarMenus &&
                            sidebarMenus.length > 0
                              ? setSidebarMenus("")
                              : setSidebarMenus(item?.menu?._id)
                          }
                        >
                          <i className="fas fa-chevron-down"></i>
                        </span>
                      )}
                    </Dropdown.Toggle>
                    {item?.subMenu?.length > 0 && (
                      <Dropdown.Menu
                        renderOnMount={true}
                        className={` ${
                          item?.menu?._id === sidebarMenus && "open"
                        }`}
                      >
                        {item?.subMenu?.map((subMenuItem) => {
                          return (
                            <Dropdown.Item
                              className="james"
                              key={subMenuItem?._id}
                              onClick={() => {
                                setIsMobileViewSidebarOpen(false);
                                subMenuItem.isMenuDeeplink
                                  ? redirectURL(`${subMenuItem.deepLink}`)
                                  : navigate(
                                      `${HEADER_TOPBAR_ROUTE.LINKS.replace(
                                        ":navbarHeading",
                                        `${subMenuItem.slug}`
                                      )}`,
                                      { state: subMenuItem.deepLink }
                                    );
                              }}
                            >
                              {wordCapitalize(subMenuItem?.menuName ?? "")}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                </li>
              ))}

            {window.innerWidth < 576 && (
              <>
                {menuLevelsData.level1 &&
                  menuLevelsData.level1?.length > 0 &&
                  menuLevelsData.level1?.map((item, index) => (
                    <li className="nav-item">
                      <div className="dropdown">
                        <button
                          className="nav-link dropdown-toggle btn btn-primary"
                          onClick={() => {
                            setIsMobileViewSidebarOpen(false);
                            item.menu.isMenuDeeplink
                              ? redirectURL(item.menu.deepLink)
                              : navigate(
                                  `${HEADER_TOPBAR_ROUTE.LINKS.replace(
                                    ":navbarHeading",
                                    `${item.menu.slug}`
                                  )}`
                                );
                          }}
                        >
                          <span>{item?.menu?.menuName}</span>
                        </button>
                      </div>
                    </li>
                  ))}
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      className="nav-link dropdown-toggle btn btn-primary"
                      onClick={() => {
                        setIsMobileViewSidebarOpen(false);
                        navigate(BLOG_ROUTE.BLOG_LISTS);
                      }}
                    >
                      <span>Blog</span>
                    </button>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default BottomHeader;
