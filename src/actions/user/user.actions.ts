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

export const updateEmail = (email: string) => {
  return {
    payload: {
      email
    },
    type: userTypes.UPDATE_EMAIL
  };
};

export const updateGivenName = (givenName: string) => {
  return {
    payload: {
      givenName
    },
    type: userTypes.UPDATE_GIVEN_NAME
  };
};

export const updateFamilyName = (familyName: string) => {
  return {
    payload: {
      familyName
    },
    type: userTypes.UPDATE_FAMILY_NAME
  };
};

export const updatePassword = (password: string) => {
  return {
    payload: {
      password
    },
    type: userTypes.UPDATE_PASSWORD
  };
};