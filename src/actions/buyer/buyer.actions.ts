import { buyerTypes } from "./buyer.types";
import axios from "axios";
import { buyerInterceptor } from "../../interceptors/buyer.interceptor";
import { environment } from "../../environment";

export const updateBidPrice = (bidPrice: string) => {
  return {
    payload: {
      bidPrice
    },
    type: buyerTypes.UPDATE_BID_PRICE
  };
};

export const updateBidSeller = (bidSeller: string) => {
  return {
    payload: {
      bidSeller
    },
    type: buyerTypes.UPDATE_BID_SELLER
  };
};

export const updateBoughtPrice = (boughtPrice: string) => {
  return {
    payload: {
      boughtPrice
    },
    type: buyerTypes.UPDATE_BOUGHT_PRICE
  };
};

export const updateBoughtSeller = (boughtSeller: string) => {
  return {
    payload: {
      boughtSeller
    },
    type: buyerTypes.UPDATE_BOUGHT_SELLER
  };
};

export const updateBoughtTime = (boughtTime: string) => {
  return {
    payload: {
      boughtTime
    },
    type: buyerTypes.UPDATE_BOUGHT_TIME
  };
};

export const updateHighest = () => {
  return {
    payload: {
      highestBid: false
    },
    type: buyerTypes.UPDATE_HIGHEST
  };
};

export const updateItemNameBought = (itemNameBought: string) => {
  return {
    payload: {
      itemNameBought
    },
    type: buyerTypes.UPDATE_ITEM_NAME_BOUGHT
  };
};

export const updatePostTimeBid = (postTimeBid: string) => {
  return {
    payload: {
      postTimeBid
    },
    type: buyerTypes.UPDATE_POST_TIME_BID
  };
};

export const updatePostTimeBought = (postTimeBought: string) => {
  return {
    payload: {
      postTimeBought
    },
    type: buyerTypes.UPDATE_POST_TIME_BOUGHT
  };
};

export const putNewBid = (currentBuyer: any) => (dispatch: any) => {
  console.log(currentBuyer);
  buyerInterceptor
    .put(
      environment.context + "buyer/update-bought-info/" + currentBuyer.username,
      currentBuyer
    )
    .then(resp => {
      console.log(resp);
      dispatch({
        payload: {},
        type: buyerTypes.PUT_NEW_BID
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const postNewBuyer = (currentBuyer: any) => (dispatch: any) => {
  const newBuyer = {
    bids: [],
    boughtItems: [],
    username: currentBuyer
  };
  console.log(currentBuyer);
  axios
    .post(environment.context + "buyer/add-buyer", newBuyer)
    .then(resp => {
      dispatch({
        payload: {},
        type: buyerTypes.POST_NEW_BUYER
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getBuyer = (username: string) => (dispatch: any) => {
  buyerInterceptor
    .get(environment.context + "buyer/get-buyer/" + username)
    .then((resp: any) => {
      dispatch({
        payload: {
          currentBuyer: resp.data
        },
        type: buyerTypes.GET_BUYER
      });
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const addToBids = (newBid: any, bids: any[]) => {
  return {
    payload: {
      bids: [...bids, newBid]
    },
    type: buyerTypes.ADD_TO_BIDS
  };
};

export const addToBought = (newBought: any, boughtItems: any[]) => (
  dispatch: any
) => {
  dispatch({
    payload: {
      boughtItems: [...boughtItems, newBought]
    },
    type: buyerTypes.ADD_TO_BOUGHT
  });
};

export const reinitializeBuyer = () => {
  return {
    payload: {},
    type: buyerTypes.REINITIALIZE_BUYER
  };
};
