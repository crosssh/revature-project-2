import { combineReducers } from "redux";
import { productReducer } from "./product.reducer";
import { buyerReducer } from "./buyer.reducer";
import { userReducer } from "./user.reducer";

export interface IProduct {
  currentProduct: any;
  productList: any[];
}

export interface IBuyer {
  currentBuyer: any;
  newBid: any;
  newBoughtItem: any;
}

export interface IUser {
  username: string;
  errorMessage: string;
  authToken: string;
}

export interface IState {
  user: IUser;
  product: IProduct;
  buyer: IBuyer;
}

export const state = combineReducers<IState>({
  buyer: buyerReducer,
  product: productReducer,
  user: userReducer
});
