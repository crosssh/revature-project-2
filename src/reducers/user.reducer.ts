import { IUser } from ".";
import { userTypes } from "../actions/user/user.types";

const initialState: IUser = {
  authToken: "",
  errorMessage: "",
  username: ""
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userTypes.UPDATE_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        password: "",
        username: ""
      };
    case userTypes.UPDATE_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload.authToken
      };
    case userTypes.UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload.username
      };
  }

  return state;
};
