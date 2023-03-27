import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  SET_FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (name, email, password, role) => (dispatch) => {
  return AuthService.register(name, email, password, role).then(
    (response) => {
      console.log("______", response);
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const getProfile = (userAuthToken) => (dispatch) => {
  return AuthService.profile(userAuthToken).then(
    (data) => {
      // console.log("user profile", data);
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: { user: data }
      });

      return data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_PROFILE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const forgetPassword = (email) => (dispatch) => {
  return AuthService.forgetPassword(email).then(
    (response) => {
      console.log("______", response);
      dispatch({
        type: FORGET_PASSWORD_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_FORGET_PASSWORD,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
