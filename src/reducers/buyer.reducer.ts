import { IBuyer } from ".";
import { buyerTypes } from "../actions/buyer/buyer.types";

const initialState: IBuyer = {
  currentBuyer: {
    bids: [],
    boughtItems: [],
    username: ""
  },
  newBid: {
    bidPrice: 0,
    highestBid: true,
    seller: "",
    timePosted: 0
  },
  newBoughtItem: {
    boughtPrice: 0,
    itemName: "",
    seller: "",
    timeBought: 0,
    timePosted: 0
  }
};

export const buyerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case buyerTypes.UPDATE_BID_PRICE:
      return {
        ...state,
        newBid: {
          ...state.newBid,
          bidPrice: action.payload.bidPrice
        }
      };
    case buyerTypes.UPDATE_HIGHEST:
      return {
        ...state,
        newBid: {
          ...state.newBid,
          highestBid: action.payload.highestBid
        }
      };

    case buyerTypes.UPDATE_BID_SELLER:
      return {
        ...state,
        newBid: {
          ...state.newBid,
          seller: action.payload.bidSeller
        }
      };

    case buyerTypes.UPDATE_POST_TIME_BID:
      return {
        ...state,
        newBid: {
          ...state.newBid,
          timePosted: action.payload.postTimeBid
        }
      };

    case buyerTypes.UPDATE_BOUGHT_PRICE:
      return {
        ...state,
        newBoughtItem: {
          ...state.newBoughtItem,
          boughtPrice: action.payload.boughtPrice
        }
      };

    case buyerTypes.UPDATE_ITEM_NAME_BOUGHT:
      return {
        ...state,
        newBoughtItem: {
          ...state.newBoughtItem,
          itemName: action.payload.itemNameBought
        }
      };

    case buyerTypes.UPDATE_BOUGHT_SELLER:
      return {
        ...state,
        newBoughtItem: {
          ...state.newBoughtItem,
          seller: action.payload.boughtSeller
        }
      };

    case buyerTypes.UPDATE_BOUGHT_TIME:
      return {
        ...state,
        newBoughtItem: {
          ...state.newBoughtItem,
          timeBought: action.payload.boughtTime
        }
      };

    case buyerTypes.UPDATE_POST_TIME_BOUGHT:
      return {
        ...state,
        newBoughtItem: {
          ...state.newBoughtItem,
          timePosted: action.payload.postTimeBought
        }
      };

    case buyerTypes.ADD_TO_BIDS:
      return {
        ...state,
        currentBuyer: {
          ...state.currentBuyer,
          bids: action.payload.bids
        }
      };

    case buyerTypes.ADD_TO_BOUGHT:
      return {
        ...state,
        currentBuyer: {
          ...state.currentBuyer,
          boughtItems: action.payload.boughtItems
        }
      };

    case buyerTypes.GET_BUYER:
      return {
        ...state,
        currentBuyer: {
          ...state.currentBuyer,
          bids: action.payload.currentBuyer[0].bids,
          boughtItems: action.payload.currentBuyer[0].boughtItems,
          username: action.payload.currentBuyer[0].username
        }
      };

    case buyerTypes.PUT_NEW_BID:
      return {
        ...state,
        newBoughtItem: {
          boughtPrice: 0,
          itemName: "",
          seller: "",
          timeBought: 0,
          timePosted: 0
        }
      };

    case buyerTypes.POST_NEW_BUYER:
      return {
        ...state
      };

    case buyerTypes.REINITIALIZE_BUYER:
      return {
        currentBuyer: {
          bids: [],
          boughtItems: [],
          username: ""
        },
        newBid: {
          bidPrice: 0,
          highestBid: true,
          seller: "",
          timePosted: 0
        },
        newBoughtItem: {
          boughtPrice: 0,
          itemName: "",
          seller: "",
          timeBought: 0,
          timePosted: 0
        }
      };
  } // end switch

  return state;
};
