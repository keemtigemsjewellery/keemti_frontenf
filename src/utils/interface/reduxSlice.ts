// Menus interfaces
export interface levelModel {
  menuLevel: string;
  type: string;
  footerMenuLevel: string;
  menu: {
    _id: string;
    menuName: string;
    menuIcon: string;
    isSubMenu: boolean;
    slug: string;
    deepLink: string;
    isMenuDeeplink: boolean;
  };
  subMenu: Array<any>;
}

export interface menuSliceModel {
  level1: levelModel[] | null;
  level2: levelModel[] | null;
  level3: levelModel[] | null;
}

// Products interfaces
export interface productDetailsModel {
  productTitle: string;
  productActualPrice: string;
  productSellingPrice: string;
  productDetails: string;
  productPrizeBreakup: string;
  productKarat: string;
  productSize: Array<any>;
  gender: string;
  productOccasion: string;
  productGallery: Array<any>;
  isWishlisted: any;
  _id: string;
  productSlug: string;
  productImage: string;
  productGram: string;
  productOfferPrice: string;
}
export interface filterDataModel {
  gender: Array<any>;
  goldCarat: Array<any>;
  goldWeight: Array<any>;
  occasions: Array<any>;
  productCategory: Array<any>;
  price: Array<any>;
}
export interface productSliceModel {
  allProducts: Array<any> | null;
  productDetails: productDetailsModel | null;
  categoryName: string | null;
  productName: string | null;
  allFilters: filterDataModel | null;
  allCoupons: Array<any> | null;
  totalPages: number;
  totalProducts: number;
  allCategories: Array<any> | null;
}

// Banners interfaces
export interface bannerSliceModel {
  allBanners: Array<any> | null;
}

// Cart interfaces
export interface cartSliceModel {
  cartProducts: Array<any>;
  totalAmount: number;
  discountAmount: number;
  couponAmount: number;
  allCoupons: any;
  adminShippingMaxValue: number;
  adminShippingMinValue: number;
  adminShippingAmount: number;
  adminFlatShippingCharge: number;
  adminPercentageShippingCharge: number;
  shippingType: string;
}

// Order interface
export interface orderSliceModel {
  allOrders: Array<any> | null;
}
