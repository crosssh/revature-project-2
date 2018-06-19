import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { productReducer } from "./product.reducer";
import { buyerReducer } from "./buyer.reducer";

export interface IProduct {
  
  currentProduct: any
  productList: any[]
}

export interface IBuyer {
  
  currentBuyer: any
  newBid: any
  newBoughtItem: any
  
}



export interface ISignIn {
  username: string,
  password: string,
  errorMessage: string
}

export interface IState {
  signIn: ISignIn
  product: IProduct
  buyer:IBuyer
};



export const state = combineReducers<IState>({
  buyer: buyerReducer,
  product: productReducer,
  signIn: signInReducer,
  
  
});