import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getAllProductDetailsByFiltersAPI } from "../../../utils/api/service/productService";

import ProductListing from "./ProductListing";
import Filterbar from "./Filterbar";
import { setProductToWishListStatusAction } from "store/slices/wishlistSlice";
import { scrollToTop } from "utils/helper/helper";
import AbortController from "abort-controller";
import { abortAPI } from "utils/abortAPIHandler";

const ProductList = () => {
  const { categorySlug, bannerSlug, searchSlug } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const dispatch = useDispatch();

  // Filter Product Logic
  const filterInitialValue = {
    slug: "",
    minPrice: "",
    maxPrice: "",
    gender: [],
    productKarat: [],
    productWeight: [],
    productOccasion: [],
    productCategory: [],
    productPrice: [],
    bannerSlug: "",
    filter: "",
  };

  const [productListingData, setProductListingData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);

  const [filters, setFilters] = useState<any>(filterInitialValue);
  const [queryParamsData, setQueryParamsData] = useState("");

  const minPriceParams = query.get("min-price");
  const maxPriceParams = query.get("max-price");
  const genderParams = query.get("gender");
  const productKaratParams = query.get("product-karat");
  const productWeightParams = query.get("product-weight");
  const productOccasionParams = query.get("product-occasion");
  const productCategoryParams = query.get("product-category");
  const productPriceParams = query.get("product-price");

  useEffect(() => {
    setFilters({
      slug: categorySlug ?? "",
      minPrice: minPriceParams ?? "",
      maxPrice: maxPriceParams ?? "",
      gender: genderParams?.split(",") ?? [],
      productKarat: productKaratParams?.split(",") ?? [],
      productWeight: productWeightParams?.split(",") ?? [],
      productOccasion: productOccasionParams?.split(",") ?? [],
      productCategory: productCategoryParams?.split(",") ?? [],
      productPrice: productPriceParams?.split(",") ?? [],
      bannerSlug: bannerSlug ?? "",
      filter: searchSlug?.replaceAll("-", " ") ?? "",
    });
  }, [location]);

  const productListAPIHandler = async (paginationChange: boolean) => {
    let finalQuery;

    if (paginationChange && paginationCurrentPage > 1) {
      finalQuery = queryParamsData + `&page=${paginationCurrentPage}`;
    } else {
      finalQuery = queryParamsData;
      setPaginationCurrentPage(1);
    }

    setLoading(true);
    const controller = new AbortController();
    const data: any = await getAllProductDetailsByFiltersAPI(
      finalQuery,
      controller
    );

    setLoading(false);

    if (data !== undefined) {
      setProductListingData(data?.data?.data);

      const wishListStutusData =
        data?.data?.data?.docs &&
        data?.data?.data?.docs?.length > 0 &&
        data?.data?.data?.docs?.map((categoryItem: any) => {
          return {
            id: categoryItem._id,
            isWishlisted: categoryItem.isWishlisted,
          };
        });

      dispatch(setProductToWishListStatusAction(wishListStutusData ?? []));
    }

    scrollToTop();
  };

  useEffect(() => {
    abortAPI("/productFilter");

    if (
      queryParamsData.length > 0 &&
      !location.pathname.includes("all-products")
    ) {
      productListAPIHandler(false);
    }
    if (
      (queryParamsData.length === 0 &&
        query.size === 0 &&
        location.pathname.includes("all-products")) ||
      (queryParamsData.length > 0 &&
        query.size > 0 &&
        location.pathname.includes("all-products"))
    ) {
      productListAPIHandler(false);
    }
  }, [queryParamsData]);

  useEffect(() => {
    abortAPI("/productFilter");

    if (
      queryParamsData.length > 0 &&
      !location.pathname.includes("all-products")
    ) {
      productListAPIHandler(true);
    }
    if (
      (queryParamsData.length === 0 &&
        query.size === 0 &&
        location.pathname.includes("all-products")) ||
      (queryParamsData.length > 0 &&
        query.size > 0 &&
        location.pathname.includes("all-products"))
    ) {
      productListAPIHandler(true);
    }
  }, [paginationCurrentPage]);

  return (
    <div className="inner-page">
      <section className="graybg product-list-section section-space pt-4 pt-md-3">
        <div className="container">
          <div className="row">
            <Filterbar
              filters={filters}
              setQueryParamsData={setQueryParamsData}
            />
            <ProductListing
              loading={loading}
              paginationCurrentPage={paginationCurrentPage}
              setPaginationCurrentPage={setPaginationCurrentPage}
              productListingData={productListingData?.docs ?? []}
              totalPages={productListingData?.totalPages ?? 0}
              totalProducts={productListingData?.totalDocs ?? 0}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
