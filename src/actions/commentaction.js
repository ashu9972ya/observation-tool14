import {
  GET_ALL_COMMENT,
  GET_ALL_COMMENT_FAIL,
  ADD_COMMENT,
  ADD_COMMENT_FAIL,
  GET_COMMENTBYID_PASS,
  GET_COMMENTBYID_FAIL,
  ADD_REPLY_SUCCESS,
  ADD_REPLY_FAILURE,
  UPDATE_COMMENT_PASS,
  UPDATE_COMMENT_FAIL,
  DELETE_COMMENT_PASS,
  DELETE_COMMENT_FAIL,
  GET_REPLYBYID_FAIL,
  GET_REPLYBYID_PASS,
  UPDATE_REPLY_PASS,
  UPDATE_REPLY_FAIL,
  GETSELECTED_REPLY_PASS,
  GETSELECTED_REPLY_FAIL,
  DELETE_SELECTED_REPLY_PASS,
  DELETE_SELECTED_REPLY_FAIL,
  SET_MESSAGE,
  DELETE_ITEM_START,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  UPDATE_COUNT_DATA,
} from "./types";
import commentapi from "../services/commentapi";
import axios from "axios";
export const getAllComments =
  (offset, limit, observationVideoId) => (dispatch) => {
    return commentapi.getAllcommentapi(offset, limit, observationVideoId).then(
      (res) => {
        dispatch({
          type: GET_ALL_COMMENT,
          payload: res,
        });
        return res;
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: GET_ALL_COMMENT_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const addcomment =
  (
    observationTypeId,
    observationVideoId,
    relatedTo,
    comment,
    videoTime,
    userId,
    createdBy,
    isActive,
    userAuthToken
  ) =>
  (dispatch) => {
    return commentapi
      .postcomments(
        observationTypeId,
        observationVideoId,
        relatedTo,
        comment,
        videoTime,
        userId,
        createdBy,
        isActive,
        userAuthToken
      )
      .then(
        (res) => {
          console.log("add comment action api ", res);
          dispatch({
            type: ADD_COMMENT,
            payload: res,
          });
          return res;
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          dispatch({
            type: ADD_COMMENT_FAIL,
          });

          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });

          return Promise.reject();
        }
      );
  };
export const getSingleCommnent =
  (observationByFacultyId, userAuthToken) => (dispatch) => {
    return commentapi
      .getCommentById(observationByFacultyId, userAuthToken)
      .then(
        (res) => {
          dispatch({
            type: GET_COMMENTBYID_PASS,
            payload: res,
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
            type: GET_COMMENTBYID_FAIL,
          });

          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });

          return Promise.reject();
        }
      );
  };

export const addReply =
  (observationByFacultyId, parentId, comment, userId, createdBy, isActive) =>
  async (dispatch) => {
    try {
      const response = await commentapi.AddReplyApi(
        observationByFacultyId,
        parentId,
        comment,
        userId,
        createdBy,
        isActive
      );
      dispatch({
        type: ADD_REPLY_SUCCESS,
        payload: response,
      });
      console.log(("response of add reply action", response))
      return  response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: ADD_REPLY_FAILURE,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return await Promise.reject();
    }
  };

export const updateCommentAction =
  (
    observationByFacultyId,
    observationTypeId,
    observationVideoId,
    relatedTo,
    comment,
    videoTime,
    userId,
    createdBy,
    isActive
  ) =>
  async (dispatch) => {
    try {
      const response = await commentapi.updateComment(
        observationByFacultyId,
        observationTypeId,
        observationVideoId,
        relatedTo,
        comment,
        videoTime,
        userId,
        createdBy,
        isActive
      );
      dispatch({
        type: UPDATE_COMMENT_PASS,
        payload: response,
      });
      console.log("updated action", response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UPDATE_COMMENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  };

export const deleteCommentAction = (commentId) => (dispatch) => {
  // dispatch({ type: DELETE_ITEM_START });
  console.log("commadasdsadid dsids", commentId);
  axios
    .delete(`http://206.189.143.201:7000/api/ObservationByFaculty/${commentId}`)
    .then((response) => {
      console.log("REDDADsdsaasdas", response);
      dispatch({
        type: DELETE_ITEM_SUCCESS,
        payload: commentId,
      });
    })
    .catch((error) => {
      console.log("eerrrotinf ", error);

      dispatch({
        type: DELETE_ITEM_FAILURE,
        payload: error.message,
      });
    });
};

export const getReplyByIdAction =
  (observationReplyId, userAuthToken) => async (dispatch) => {
    try {
      const response = await commentapi.getReplyById(
        observationReplyId,
        userAuthToken
      );
      dispatch({
        type: GET_REPLYBYID_PASS,
        payload: response.data,
      });
      return Promise.resolve();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_REPLYBYID_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  };
export const updateReplyAction =
  (
    observationReplyId,
    observationByFacultyId,
    comment,
    userId,
    createdBy,
    isActive,
    userAuthToken
  ) =>
  async (dispatch) => {
    try {
      const response = await commentapi.updateReply(
        observationReplyId,
        observationByFacultyId,
        comment,
        userId,
        createdBy,
        isActive,
        userAuthToken
      );
      dispatch({
        type: UPDATE_REPLY_PASS,
        payload: response,
      });
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UPDATE_REPLY_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  };
export const getSelectedReply =
  (observationReplyId, userAuthToken) => async (dispatch) => {
    try {
      const response = await commentapi.getSelectedReply(
        observationReplyId,
        userAuthToken
      );
      dispatch({
        type: GETSELECTED_REPLY_PASS,
        payload: response.data,
      });
      return Promise.resolve();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GETSELECTED_REPLY_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  };
export const deleteSelectedReplyAction =
  (observationReplyId) => async (dispatch) => {
    try {
      const response = await commentapi.deleteSelectedReply(
        observationReplyId,
      );
      dispatch({
        type: DELETE_SELECTED_REPLY_PASS,
        payload: response,
      });
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: DELETE_SELECTED_REPLY_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  };

  export const updatePlayersettingData = (datas) => (dispatch) => {

    dispatch({
      type: UPDATE_COUNT_DATA,
      payload:datas
    });
  };
