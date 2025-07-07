import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import { getMenuLevelsData } from "store/slices/menuSlice";

const NavbarHeading = () => {
  const headingData = useSelector(getMenuLevelsData);
  const clean = (html: string) => DOMPurify.sanitize(html);

  const { navbarHeading } = useParams();

  return (
    <div className="graybg">
      <div className="container py-5">
        <>
          {headingData &&
            headingData?.level1 &&
            headingData?.level1.length > 0 && (
              <>
                {headingData.level1.map((headerItem: any, index: any) => (
                  <React.Fragment key={index}>
                    {headerItem.menu.slug === navbarHeading && (
                      <>{parse(clean(headerItem.menu.deepLink))}</>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          {headingData &&
            headingData?.level2 &&
            headingData?.level2.length > 0 && (
              <>
                {headingData.level2.map((headerItem: any, index: any) => (
                  <React.Fragment key={index}>
                    {headerItem?.subMenu &&
                      headerItem?.subMenu?.length > 0 &&
                      headerItem?.subMenu?.map(
                        (subMenuItem: any, index: any) =>
                          subMenuItem?.isMenuDeeplink === false &&
                          subMenuItem?.slug === navbarHeading && (
                            <React.Fragment key={index}>
                              {parse(clean(subMenuItem.deepLink))}
                            </React.Fragment>
                          )
                      )}
                  </React.Fragment>
                ))}
              </>
            )}
          {headingData &&
            headingData?.level2 &&
            headingData?.level2.length > 0 && (
              <>
                {headingData.level2.map((headerItem: any, index: any) => (
                  <React.Fragment key={index}>
                    {headerItem?.menu &&
                      headerItem?.menu?.isMenuDeeplink === false &&
                      headerItem?.menu?.slug === navbarHeading && (
                        <React.Fragment key={index}>
                          {parse(clean(headerItem?.menu.deepLink))}
                        </React.Fragment>
                      )}
                  </React.Fragment>
                ))}
              </>
            )}
        </>
      </div>
    </div>
  );
};

export default NavbarHeading;
