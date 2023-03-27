import {
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORYBYID_SUCCESS,
  GET_CATEGORYBYID_FAIL,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
} from "./types";

import categoryApi from "../services/categoryApi";

export const getCategory = (offset, limit, isActive) => (dispatch) => {
  return categoryApi.Category(offset, limit, isActive).then(
    (data) => {
      console.log("get video inside categiryAction :getCategory ", data);
      dispatch({
        type: GET_CATEGORY_SUCCESS,
        payload: { types: data },
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
        type: GET_CATEGORY_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const AddCategoryAction =
  (title, description, colorCode, isActive, userAuthToken) => (dispatch) => {
    return categoryApi.AddCategory(title, description, colorCode, isActive, userAuthToken).then(
      (data) => {
        console.log("get video inside categiryAction :getCategory ", data);
        dispatch({
          type: ADD_CATEGORY_SUCCESS,
          payload: { types: data },
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
          type: ADD_CATEGORY_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };
export const getCategoryById =
  (observationTypeId, userAuthToken) => (dispatch) => {
    return categoryApi.SingleCategory(observationTypeId, userAuthToken).then(
      (data) => {
        console.log("get video inside categoryAction : getCategoryById", data);
        dispatch({
          type: GET_CATEGORYBYID_SUCCESS,
          payload: { types: data },
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
          type: GET_CATEGORYBYID_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };
