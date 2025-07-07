import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import React from "react";
import { useSelector } from "react-redux";
import { getMenuLevelsData } from "store/slices/menuSlice";

const FooterLinkDetails = () => {
  const headingData: any = useSelector(getMenuLevelsData);

  const clean = (html: string) => DOMPurify.sanitize(html);
  const { footerSubmenu } = useParams();

  return (
    <div className="container my-5">
      {headingData && headingData?.level3 && headingData?.level3.length > 0 && (
        <>
          {headingData.level3.map((headerItem: any, index: any) => (
            <React.Fragment key={index}>
              {headerItem?.subMenu &&
                headerItem?.subMenu?.length > 0 &&
                headerItem?.subMenu?.map(
                  (subMenuItem: any, index: any) =>
                    subMenuItem?.isMenuDeeplink === false &&
                    subMenuItem?.slug === footerSubmenu && (
                      <React.Fragment key={index}>
                        {parse(clean(subMenuItem.deepLink))}
                      </React.Fragment>
                    )
                )}

              {headerItem?.menu &&
                headerItem?.menu?.isMenuDeeplink === false &&
                headerItem?.menu?.slug === footerSubmenu && (
                  <React.Fragment key={index}>
                    {parse(clean(headerItem?.menu?.deepLink))}
                  </React.Fragment>
                )}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default FooterLinkDetails;
