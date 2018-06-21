import { productTypes } from "./product.types";
import { productInterceptor } from "../../interceptors/product.interceptor";
import { environment } from "../../environment";

export const updateBidder = (bidder: string) => {
  return {
    payload: {
      bidder
    },
    type: productTypes.UPDATE_BIDDER
  };
};

export const updateCategory = (category: string) => {
  return {
    payload: {
      category
    },
    type: productTypes.UPDATE_CATEGORY
  };
};

export const updateCondition = (condition: string) => {
  return {
    payload: {
      condition
    },
    type: productTypes.UPDATE_CONDITION
  };
};

export const updateCurrentBid = (currentBid: number) => {
  return {
    payload: {
      currentBid
    },
    type: productTypes.UPDATE_CURRENT_BID
  };
};

export const updateName = (name: string) => {
  return {
    payload: {
      name
    },
    type: productTypes.UPDATE_NAME
  };
};

export const updatePhotos = (photos: string) => {
  return {
    payload: {
      photos
    },
    type: productTypes.UPDATE_PHOTOS
  };
};

export const updateStatus = (status: string) => {
  return {
    payload: {
      status
    },
    type: productTypes.UPDATE_STATUS
  };
};

export const updateType = (type: string) => {
  return {
    payload: {
      type
    },
    type: productTypes.UPDATE_TYPE
  };
};

export const updateProductUsername = (username: string) => {
  return {
    payload: {
      username
    },
    type: productTypes.UPDATE_PRODUCT_USERNAME
  };
};

export const setAuctionEnd = (auctionEnd: number) => {
  return {
    payload: {
      auctionEnd
    },
    type: productTypes.SET_AUCTION_END
  };
};

export const setBuyNow = (buyNowPrice: number) => {
  return {
    payload: {
      buyNowPrice
    },
    type: productTypes.SET_BUY_NOW
  };
};

export const setMinBid = (minBid: number) => {
  return {
    payload: {
      minBid
    },
    type: productTypes.SET_MIN_BID
  };
};

export const setTimePosted = (timePosted: number) => (dispatch: any) => {
  dispatch({
    payload: {
      timePosted
    },
    type: productTypes.SET_TIME_POSTED
  });
};

export const getByCategory = () => {
  return {
    payload: {
      productList: []
    },
    type: productTypes.GET_BY_CATEGORY
  };
};

export const getByName = () => {
  return {
    payload: {
      productList: []
    },
    type: productTypes.GET_BY_NAME
  };
};

export const getByType = () => {
  return {
    payload: {
      productList: []
    },
    type: productTypes.GET_BY_TYPE
  };
};

export const getRecent = () => {
  return {
    payload: {
      productList: []
    },
    type: productTypes.GET_RECENT
  };
};

export const getSeller = () => {
  return {
    payload: {
      productList: []
    },
    type: productTypes.GET_SELLER
  };
};

export const getBySellerAndTime = () => {
  return {
    payload: {
      productList: []
    },
    type: productTypes.GET_BY_SELLER_AND_TIME
  };
};

export const addProduct = (currentProduct: any) => (dispatch: any) => {
  productInterceptor
    .post(environment.context + "product/add-pop", currentProduct)
    .then(resp => {
      console.log(resp.statusText);
      dispatch({
        payload: {},
        type: productTypes.ADD_PRODUCT
      });
    })
    .catch(err => {
      console.log(err);
    });
};
