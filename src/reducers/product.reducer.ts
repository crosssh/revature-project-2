import { IProduct } from ".";
import { productTypes } from "../actions/product/product.types";

const initialState: IProduct = {
  chosenItem: null,
  currentProduct: {
    auctionEndTime: 0,
    buyNowPrice: 0,
    category: "",
    condition: "",
    currentBidPrice: 0,
    currentBidder: "",
    minimumBidPrice: 0,
    name: "",
    photoNames: [],
    status: "available",
    timePosted: 0,
    type: "",
    username: ""
  },
  photos: [],
  productList: [],
  url: ""
};

export const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case productTypes.UPDATE_BIDDER:
      return {
        ...state,
        chosenItem: {
          ...state.chosenItem,
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
        chosenItem: {
          ...state.chosenItem,
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
        photos: action.payload.photos
      };

    case productTypes.UPDATE_PHOTO_NAMES:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          photoNames: action.payload.photoNames
        }
      };

    case productTypes.UPDATE_STATUS:
      return {
        ...state,
        chosenItem: {
          ...state.chosenItem,
          status: action.payload.status
        }
      };

    case productTypes.UPDATE_URL:
      return {
        ...state,
        url: action.payload.url
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
        chosenItem: action.payload.chosenItem
      };

    case productTypes.PUT_PRODUCT:
      return {
        ...state
        // chosenItem: {}
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
          photoNames: [],
          status: "available",
          timePosted: 0,
          type: "",
          username: ""
        },
        photos: []
      };
    case productTypes.REINITIALIZE_PRODUCT:
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
          photoNames: [],
          status: "available",
          timePosted: 0,
          type: "",
          username: ""
        },
        photos: [],
        url: ""
      };
  } // end switch

  return state;
};
