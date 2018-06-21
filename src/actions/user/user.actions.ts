import { userTypes } from "./user.types";

export const updateError = (errorMessage: string) => {
  return {
    payload: {
      errorMessage
    },
    type: userTypes.UPDATE_ERROR
  };
};

export const updateAuthToken = (authToken: string) => {
  return {
    payload: {
      authToken
    },
    type: userTypes.UPDATE_AUTH_TOKEN
  };
};

export const updateUsername = (username: string) => {
  return {
    payload: {
      username
    },
    type: userTypes.UPDATE_USERNAME
  };
};
