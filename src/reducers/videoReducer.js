import {
  GET_ALLVIDEO_SUCCESS,
  GET_ALLVIDEO_FAIL,
  GET_SINGLE_VIDEO_SUCCESS,
  GET_SINGLE_VIDEO_FAIL,
} from "../actions/types";

const initialState = {
  videos: {},
  error: null,
};
console.log("rducess", initialState)
const videoReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALLVIDEO_SUCCESS:
      console.log('videoREDUCER OF All VIDEO ' ,  payload.video)

      return {
        ...state,
        videos: payload.video,
        error: null,
      };
    case GET_ALLVIDEO_FAIL:
      return {
        ...state,
        error: "Failed to get videos",
      };
    case GET_SINGLE_VIDEO_SUCCESS:
      console.log('INSIDE REDUCER OF SINGLE VIDEO ' ,  payload.video)
      return {
        ...state,
        videos:payload.video.result,
        error: null,
      };
    case GET_SINGLE_VIDEO_FAIL:
      return {
        ...state,
        videos: null,
        error: payload.message,
      };

    default:
      return state;
  }
};

export default videoReducer;
