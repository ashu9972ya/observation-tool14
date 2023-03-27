import {
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORYBYID_SUCCESS,
  GET_CATEGORYBYID_FAIL,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
} from "../actions/types";

const initialState = {
  categories: {},
  selectedCategory: null,
  error: null,
};
console.log("category reducer", initialState)

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY_SUCCESS:
      console.log("GET_CATEGORY_SUCCESS" ,payload.types.result )
      return {
        ...state,
        categories: payload.types.result,
        error: null,
      };
    case GET_CATEGORY_FAIL:
      return {
        ...state,
        error: payload.message,
      };
    case GET_CATEGORYBYID_SUCCESS:
      return {
        ...state,
        selectedCategory: payload.types,
        error: null,
      };
    case GET_CATEGORYBYID_FAIL:
      return {
        ...state,
        selectedCategory: null,
        error: payload.message,
      };
      case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: payload.types,
        error: null,
      };
    case ADD_CATEGORY_FAIL:
      return {
        ...state,
        categories: null,
        error: payload.message,
      };
    default:
      return state;
  }
};

export default categoryReducer;
