import { IProduct } from ".";
import { productTypes } from "../actions/product/product.types";

const initialState: IProduct = {
  currentProduct: {
    auctionEndTime: 0,
    buyNowPrice: 0,
    category: "",
    condition: "",
    currentBidPrice: 0,
    currentBidder: "N/A",
    minimumBidPrice: 0,
    name: "",
    photos: "url",
    status: "available",
    timePosted: 0,
    type: "",
    username: "Crosssh"
  },
  productList: []
};

export const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case productTypes.UPDATE_BIDDER:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          currentBidder: action.payload.bidder
        }
      };
    case productTypes.UPDATE_CATEGORY:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          category: action.payload.category
        }
      };

    case productTypes.UPDATE_CONDITION:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          condition: action.payload.condition
        }
      };

    case productTypes.UPDATE_CURRENT_BID:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          currentBidPrice: action.payload.currentBid
        }
      };

    case productTypes.UPDATE_NAME:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          name: action.payload.name
        }
      };

    case productTypes.UPDATE_PRODUCT_USERNAME:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          username: action.payload.username
        }
      };

    case productTypes.UPDATE_PHOTOS:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          photos: action.payload.photos
        }
      };

    case productTypes.UPDATE_STATUS:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          status: action.payload.status
        }
      };

    case productTypes.UPDATE_TYPE:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          type: action.payload.type
        }
      };

    case productTypes.SET_AUCTION_END:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          auctionEndTime: action.payload.auctionEnd
        }
      };

    case productTypes.SET_BUY_NOW:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          buyNowPrice: action.payload.buyNowPrice
        }
      };

    case productTypes.SET_MIN_BID:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          minimumBidPrice: action.payload.minBid
        }
      };

    case productTypes.SET_TIME_POSTED:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          timePosted: action.payload.timePosted
        }
      };

    case productTypes.GET_BY_CATEGORY:
      return {
        ...state,
        productList: action.payload.productList
      };

    case productTypes.GET_BY_NAME:
      return {
        ...state,
        productList: action.payload.productList
      };

    case productTypes.GET_BY_TYPE:
      return {
        ...state,
        productList: action.payload.productList
      };

    case productTypes.GET_RECENT:
      return {
        ...state,
        productList: action.payload.productList
      };

    case productTypes.GET_SELLER:
      return {
        ...state,
        productList: action.payload.productList
      };

    case productTypes.GET_BY_SELLER_AND_TIME:
      return {
        ...state,
        productList: action.payload.productList
      };

    case productTypes.ADD_PRODUCT:
      return {
        ...state,
        currentProduct: {
          auctionEndTime: 0,
          buyNowPrice: 0,
          category: "",
          condition: "",
          currentBidPrice: 0,
          currentBidder: "N/A",
          minimumBidPrice: 0,
          name: "",
          photos: "url",
          status: "available",
          timePosted: 0,
          type: "",
          username: ""
        }
      };
  } // end switch

  return state;
};
