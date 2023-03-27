import {
  GET_ALLVIDEO_SUCCESS,
  GET_ALLVIDEO_FAIL,
  SET_MESSAGE,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAIL,
  GET_SINGLE_VIDEO_SUCCESS,
  GET_SINGLE_VIDEO_FAIL
} from "./types";
import VideoApi from "../services/VideoApi";

export const getAllVideos = (offset, limit, userId) => (dispatch) => {
  return VideoApi.getVideo(offset, limit, userId).then(
    (data) => {
      console.log("get video inside videoAction : getAllVideos", data);
    
      dispatch({
        type: GET_ALLVIDEO_SUCCESS,
        payload: { video: data },
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
        type: GET_ALLVIDEO_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const uploadVideos =
  (videoUrl, userId, reviewedBy, reviewStatus, isActive) => (dispatch) => {
    return VideoApi.uploadVideo(
      videoUrl,
      userId,
      reviewedBy,
      reviewStatus,
      isActive
    ).then(
      (data) => {
        console.log("get video in videAction  : uploadVideos ", data);
        dispatch({
          type: UPLOAD_VIDEO_SUCCESS,
          payload: { uploadvideo: data },
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
          type: UPLOAD_VIDEO_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };
export const getSingleVideos =
  (observationVideoId) => (dispatch) => {
    return VideoApi.singleVideo(
    observationVideoId
    ).then(
      (data) => {
        console.log("get video in videAction :getSingleVideos ", data);
        dispatch({
          type: GET_SINGLE_VIDEO_SUCCESS,
          payload: { video: data },
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
          type: GET_SINGLE_VIDEO_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };
