import { IUser } from ".";
import { userTypes } from "../actions/user/user.types";

const initialState: IUser = {
  attribute: {
    email: "",
    family_name: "",
    given_name: "",
  },
  authToken: "",
  errorMessage: "",
  password: "",
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
      case userTypes.UPDATE_EMAIL:
      return {
        ...state,
        attribute: {
          ...state.attribute,
          email: action.payload.email
        }
      };
      case userTypes.UPDATE_FAMILY_NAME:
      return {
        ...state,
        attribute: {
          ...state.attribute,
          family_name: action.payload.familyName
        }
      };
      case userTypes.UPDATE_GIVEN_NAME:
      return {
        ...state,
        attribute: {
          ...state.attribute,
          given_name: action.payload.givenName
        }
      };
      case userTypes.UPDATE_PASSWORD:
        return {
          ...state,
          password: action.payload.password
        };
  }

  return state;
};
