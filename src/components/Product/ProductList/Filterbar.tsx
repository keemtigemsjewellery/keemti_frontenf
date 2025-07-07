import { useCallback, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import {
  removeEmptyParams,
  urlSearchParams,
  wordCapitalize,
} from "utils/helper/helper";
import { productFiltersNameConverter } from "utils/helper/productFiltersNameConverter";

import { BANNER_ROUTE, PRODUCT_ROUTE } from "utils/api/routes/clientRoute";
import { getStaticFilterDetailsAPI } from "utils/api/service/productService";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsData,
  setMobileViewFilterVisiblityAction,
} from "store/slices/productSlice";

interface FilterbarModel {
  filters: any;
  setQueryParamsData: any;
}
const Filterbar = ({ filters, setQueryParamsData }: FilterbarModel) => {
  const { categorySlug, bannerSlug, searchSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isMobileViewFilterOpen } = useSelector(getProductsData);

  const queryParams = queryString.parse(location.search);
  const [staticFilter, setStaticFilter] = useState<any>();

  const staticFilterListHandler = useCallback(async () => {
    const { data } = await getStaticFilterDetailsAPI();
    setStaticFilter(data?.data);
  }, []);

  useEffect(() => {
    staticFilterListHandler();
    dispatch(setMobileViewFilterVisiblityAction(false));
  }, []);

  const queryParamsRedirectLogic = (qryParams: any) => {
    const filteredQueryParams = removeEmptyParams(qryParams);
    const queryParamsData = urlSearchParams(filteredQueryParams);

    categorySlug &&
      navigate(
        PRODUCT_ROUTE.PRODUCT_LISTS.replace(
          ":categorySlug",
          `${categorySlug}?${queryParamsData}`
        )
      );

    bannerSlug &&
      navigate(
        BANNER_ROUTE.BANNER_LISTS.replace(
          ":bannerSlug",
          `${bannerSlug}?${queryParamsData}`
        )
      );

    searchSlug &&
      navigate(
        PRODUCT_ROUTE.PRODUCT_SEARCH_LISTS.replace(
          ":searchSlug",
          `${searchSlug}?${queryParamsData}`
        )
      );

    categorySlug === undefined &&
      bannerSlug === undefined &&
      searchSlug === undefined &&
      navigate(
        `${PRODUCT_ROUTE.PRODUCT_LISTING_ALL_PRODUCTS}?${queryParamsData}`
      );
  };

  const updateFilterHandler = (
    checkboxArray: any,
    value: any,
    filterName: any,
    singleValue: boolean
  ) => {
    if (!singleValue && checkboxArray?.includes(`${value}`) === true) {
      const updatedFilterValue = checkboxArray
        .filter((item: any) => item != value)
        .join(",");

      queryParams[`${filterName}`] = `${updatedFilterValue}`;
      queryParamsRedirectLogic(queryParams);
    }

    if (!singleValue && checkboxArray?.includes(`${value}`) === false) {
      const updatedFilterValue = [...checkboxArray, value];

      queryParams[`${filterName}`] = `${updatedFilterValue}`;
      queryParamsRedirectLogic(queryParams);
    }

    if (singleValue) {
      queryParams[`${filterName}`] = value;
      queryParamsRedirectLogic(queryParams);
    }
  };

  const priceFilter = filters?.productPrice?.map((value: any) => {
    const parts = value?.split("-");
    const lowerBound = parts[0];
    const upperBound = parts[1];

    return { minPrice: lowerBound, maxPrice: upperBound };
  });

  const weightFilter = filters?.productWeight?.map((value: any) => {
    const parts = value?.split("-");
    const lowerBound = parts[0];
    const upperBound = parts[1];

    return { minWeight: lowerBound, maxWeight: upperBound };
  });

  const filterData = {
    ...filters,
    productPriceses: priceFilter,
    productWeights: weightFilter,
  };

  const filteredQueryParams = removeEmptyParams(filterData);
  setQueryParamsData(urlSearchParams(filteredQueryParams));

  // Clear filters Logic
  const clearFilterHandler = () => {
    categorySlug &&
      navigate(
        `${PRODUCT_ROUTE.PRODUCT_LISTS.replace(
          ":categorySlug",
          `${categorySlug}`
        )}`
      );

    bannerSlug &&
      navigate(
        `${BANNER_ROUTE.BANNER_LISTS.replace(":bannerSlug", `${bannerSlug}`)}`
      );

    searchSlug &&
      navigate(
        PRODUCT_ROUTE.PRODUCT_SEARCH_LISTS.replace(
          ":searchSlug",
          `${searchSlug}`
        )
      );

    categorySlug === undefined &&
      bannerSlug === undefined &&
      searchSlug === undefined &&
      navigate(`${PRODUCT_ROUTE.PRODUCT_LISTING_ALL_PRODUCTS}`);
  };

  return (
    <div className="col-md-4 col-lg-3 col-sm-12">
      <div className="filter-sidebar white-bg">
        <div className="filter-div flex-row d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Filters</h4>
          <div>
            {Object.keys(queryParams).length > 0 && (
              <button
                className="btn third-btn h-auto w-auto rounded-0 px-2 py-2 fs-6 lh-1 fs-14 rounded-2"
                onClick={() => {
                  clearFilterHandler();
                  dispatch(setMobileViewFilterVisiblityAction(false));
                }}
              >
                Clear filters
              </button>
            )}
            <span
              className={`filter-mobile-btn cursor-pointer ms-3 ${
                isMobileViewFilterOpen && "flip"
              }`}
              onClick={() =>
                dispatch(
                  setMobileViewFilterVisiblityAction(!isMobileViewFilterOpen)
                )
              }
            >
              <i className="fas fa-chevron-down"></i>
            </span>
          </div>
        </div>
        <div className={`mobile-filter ${isMobileViewFilterOpen && "d-block"}`}>
          <div className="price">
            <h6>Price ₹</h6>

            <form className="row">
              <div className="form-group col-6">
                <input
                  type="text"
                  placeholder="Min"
                  className="w-100"
                  value={filters.minPrice}
                  onChange={(e) =>
                    updateFilterHandler(
                      filters.minPrice ?? "",
                      e.target.value,
                      "min-price",
                      true
                    )
                  }
                />
              </div>
              <div className="form-group col-6">
                <input
                  type="text"
                  placeholder="Max"
                  className="w-100"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    updateFilterHandler(
                      filters.maxPrice ?? "",
                      e.target.value,
                      "max-price",
                      true
                    )
                  }
                />
              </div>
            </form>
          </div>
          <div>
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Gender</Accordion.Header>
                <Accordion.Body>
                  {staticFilter?.gender && staticFilter?.gender.length > 0 && (
                    <div className="filter-checkbox">
                      {staticFilter?.gender.map(
                        (genderItem: any, index: any) => (
                          <div className="form-group" key={index}>
                            <input
                              type="checkbox"
                              id={genderItem}
                              checked={
                                filters.gender?.includes(genderItem) ?? false
                              }
                              onChange={() => {
                                dispatch(
                                  setMobileViewFilterVisiblityAction(false)
                                );
                                updateFilterHandler(
                                  filters.gender ?? [],
                                  genderItem,
                                  "gender",
                                  false
                                );
                              }}
                            />
                            <label htmlFor={genderItem}>
                              {wordCapitalize(genderItem)}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Gold Karat</Accordion.Header>
                <Accordion.Body>
                  {staticFilter?.goldCarat &&
                    staticFilter?.goldCarat.length > 0 && (
                      <div className="filter-checkbox">
                        {staticFilter?.goldCarat.map(
                          (goldCaratItem: any, index: any) => (
                            <div className="form-group" key={index}>
                              <input
                                type="checkbox"
                                id={goldCaratItem}
                                checked={
                                  filters.productKarat?.includes(
                                    `${goldCaratItem}`
                                  ) ?? false
                                }
                                onChange={() => {
                                  dispatch(
                                    setMobileViewFilterVisiblityAction(false)
                                  );
                                  updateFilterHandler(
                                    filters.productKarat ?? [],
                                    goldCaratItem,
                                    "product-karat",
                                    false
                                  );
                                }}
                              />
                              <label htmlFor={goldCaratItem}>
                                {goldCaratItem} karat
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Price</Accordion.Header>
                <Accordion.Body>
                  {staticFilter?.price && staticFilter?.price.length > 0 && (
                    <div className="filter-checkbox">
                      {staticFilter?.price.map((priceItem: any, index: any) => (
                        <div className="form-group" key={index}>
                          <input
                            type="checkbox"
                            id={priceItem}
                            checked={
                              filters.productPrice?.includes(`${priceItem}`) ??
                              false
                            }
                            onChange={() => {
                              dispatch(
                                setMobileViewFilterVisiblityAction(false)
                              );
                              updateFilterHandler(
                                filters.productPrice ?? [],
                                priceItem,
                                "product-price",
                                false
                              );
                            }}
                          />
                          <label htmlFor={priceItem}>
                            {productFiltersNameConverter(
                              `${priceItem}`,
                              "GoldPrice"
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Gold Weight</Accordion.Header>
                <Accordion.Body>
                  {staticFilter?.goldWeight &&
                    staticFilter?.goldWeight.length > 0 && (
                      <div className="filter-checkbox">
                        {staticFilter?.goldWeight.map(
                          (goldWeightItem: any, index: any) => (
                            <div className="form-group" key={index}>
                              <input
                                type="checkbox"
                                id={goldWeightItem}
                                checked={
                                  filters.productWeight?.includes(
                                    `${goldWeightItem}`
                                  ) ?? false
                                }
                                onChange={() => {
                                  dispatch(
                                    setMobileViewFilterVisiblityAction(false)
                                  );
                                  updateFilterHandler(
                                    filters.productWeight ?? [],
                                    goldWeightItem,
                                    "product-weight",
                                    false
                                  );
                                }}
                              />
                              <label htmlFor={goldWeightItem}>
                                {productFiltersNameConverter(
                                  `${goldWeightItem}`,
                                  "GoldWeight"
                                )}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Occasions</Accordion.Header>
                <Accordion.Body>
                  {staticFilter?.occasions &&
                    staticFilter?.occasions.length > 0 && (
                      <div className="filter-checkbox">
                        {staticFilter?.occasions.map(
                          (occasionsItem: any, index: any) => (
                            <div className="form-group" key={index}>
                              <input
                                type="checkbox"
                                id={occasionsItem}
                                checked={
                                  filters.productOccasion?.includes(
                                    occasionsItem
                                  ) ?? false
                                }
                                onChange={() => {
                                  dispatch(
                                    setMobileViewFilterVisiblityAction(false)
                                  );
                                  updateFilterHandler(
                                    filters.productOccasion ?? [],
                                    occasionsItem,
                                    "product-occasion",
                                    false
                                  );
                                }}
                              />
                              <label htmlFor={occasionsItem}>
                                {wordCapitalize(occasionsItem)}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>Product Category</Accordion.Header>
                <Accordion.Body>
                  {staticFilter?.productCategory &&
                    staticFilter?.productCategory.length > 0 && (
                      <div className="filter-checkbox">
                        {staticFilter?.productCategory.map(
                          (productCategoryItem: any, index: any) => (
                            <div className="form-group" key={index}>
                              <input
                                type="checkbox"
                                id={productCategoryItem}
                                checked={
                                  filters.productCategory?.includes(
                                    `${productCategoryItem}`
                                  ) ?? false
                                }
                                onChange={() => {
                                  dispatch(
                                    setMobileViewFilterVisiblityAction(false)
                                  );
                                  updateFilterHandler(
                                    filters.productCategory ?? [],
                                    productCategoryItem,
                                    "product-category",
                                    false
                                  );
                                }}
                              />
                              <label htmlFor={productCategoryItem}>
                                {wordCapitalize(productCategoryItem)}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filterbar;
