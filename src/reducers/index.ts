import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { productReducer } from "./product.reducer";

export interface IProduct {
  
  currentProduct: any
  productList: any[]
}


export interface ISignIn {
  username: string,
  password: string,
  errorMessage: string
}

export interface IState {
  signIn: ISignIn
  product: IProduct
};



export const state = combineReducers<IState>({
  product: productReducer,
  signIn: signInReducer
  
});