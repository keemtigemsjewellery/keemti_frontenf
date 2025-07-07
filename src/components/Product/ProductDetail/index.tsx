import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Standout from "./Standout";
import DynamicAccordion from "./DynamicAccordion";
import DetailsRightSide from "./DetailsRightSide";
import ImageGalleryLeftSide from "./ImageGalleryLeftSide";
import { getProductDetailsAPI } from "utils/api/service/productService";

import "react-image-gallery/styles/css/image-gallery.css";

import {
  getProductsData,
  setRecentProductsAction,
} from "store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import QuickProducts from "./QuickProducts";
import { PRODUCT_ROUTE } from "utils/api/routes/clientRoute";
import JewellaryAccordion from './JewelleryAccordion';

const ProductsDetails = () => {
  const { productSlug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recentProducts } = useSelector(getProductsData);

  const [loading, setLoading] = useState(true);
  const [productDetailsData, setProductDetailsData] = useState<any>();

  const productDetailsHandler = useCallback(async () => {
    setLoading(true);
    const { data } = await getProductDetailsAPI(productSlug!);

    setLoading(false);
    if (data?.data?.isDeleted === true) {
      navigate(PRODUCT_ROUTE.NO_PRODUCT);
      return <></>;
    }
    setProductDetailsData(data?.data);
    dispatch(setRecentProductsAction(data?.data));
  }, [productSlug]);

  useEffect(() => {
    productDetailsHandler();
  }, [productSlug]);

  return (
    <div>
      <div className="inner-page graybg">
        <section className="section-space productdetails-sec pt-4 pt-md-3 pb-0">
          <div className="container">
            <div className="white-bg white-boxbg">
              <div className="row">
                <ImageGalleryLeftSide
                  loading={loading}
                  productDetailsData={productDetailsData}
                />
                <DetailsRightSide
                  loading={loading}
                  productDetailsData={productDetailsData}
                  setProductDetailsData={setProductDetailsData}
                />
              </div>
            </div>
          </div>
        </section>

        <Standout loading={loading} />

        <DynamicAccordion
          title="Product Detail"
          details={productDetailsData && productDetailsData.productDetails}
          accordionIndex="1"
          loading={loading}
        />

        <JewellaryAccordion
          title="Jewellery Care"
          accordionIndex="2"
          loading={loading}
        />

        <QuickProducts
          details={productDetailsData && productDetailsData.matchWith}
          title="Match With"
        />

        <QuickProducts details={recentProducts ?? []} title="Recently Viewed" />

        <br />
      </div>
    </div>
  );
};

export default ProductsDetails;
