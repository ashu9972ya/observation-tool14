import {
  GET_ALL_COMMENT,
  GET_ALL_COMMENT_FAIL,
  ADD_COMMENT,
  ADD_COMMENT_FAIL,
  GET_COMMENTBYID_PASS,
  GET_COMMENTBYID_FAIL,
  UPDATE_COMMENT_PASS,
  UPDATE_COMMENT_FAIL,
  DELETE_COMMENT_PASS,
  DELETE_COMMENT_FAIL,
  GET_REPLYBYID_PASS,
  GET_REPLYBYID_FAIL,
  GETSELECTED_REPLY_PASS,
  GETSELECTED_REPLY_FAIL,
  DELETE_SELECTED_REPLY_PASS,
  DELETE_SELECTED_REPLY_FAIL,
  ADD_REPLY_FAILURE,
  ADD_REPLY_SUCCESS,
  DELETE_ITEM_START,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  UPDATE_REPLY_PASS,
  UPDATE_REPLY_FAIL,
} from "../actions/types";
const initialState = {
  comments: {
    data: {
      result: {
        data: [],
        observationCount: [],
      },
    },
  },
  dataValue: [],
  observationCount: [],
  loading: true,
  error: null,
};
console.log("data", initialState.comments);
const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENT:
      console.log("Getting GET_ALL_COMMENT ", action.payload);

      return {
        ...state,
        comments: {
          ...state.comments,
          data: {
            result: {
              data: action.payload.data.result.data,
              observationCount: action.payload.data.result.observationCount,
            },
          },
        },
        dataValue: action.payload.data.result.data,
        observationCount: action.payload.data.result.observationCount,

        error: null,
      };
    case GET_ALL_COMMENT_FAIL:
      console.log("Getting GET_ALL_COMMENT_FAIL ", initialState.comments);

      return {
        ...state,
        comments: [],
        error: action.payload,
      };
    case ADD_COMMENT:
      console.log("Getting ADD_COMMENT ", action.payload.data.result.data);
      console.log("Getting 1232131  ADD_COMMENT ", state);

      console.log(
        "AFter spreasding Getting 1232131  ADD_COMMENT ",
        state.dataValue
      );

      // console.log("in comment   ADD_COMMENT " ,state.comments)

      return {
        ...state,
        // comments: {...state.comments.data.result.data, action.payload.data.result.data},
        dataValue: state.dataValue.concat(action.payload.data.result.data),
        // comments:{...state.comments,data:{result:{data:[...state.comments.data.result.data,action.payload.data.result.data],observationCount:[...state.comments.data.result.observationCount]}}},

        // comments:[...state.comments.data.result.data,action.payload.data.result.data],

        loading: false,
        error: null,
      };

    case ADD_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_COMMENTBYID_PASS:
      console.log("Getting GET_COMMENTBYID_PASS ", initialState.comments);

      return {
        ...state,
        comments: [action.payload],
        error: null,
      };
    case GET_COMMENTBYID_FAIL:
      return {
        ...state,
        comments: [],
        error: action.payload,
      };
    // case UPDATE_COMMENT_PASS:
      
    case UPDATE_COMMENT_PASS:
      console.log("Getting UPDATE_COMMENT_PASS ", action.payload);
      const updatedComments = state.comments.data.result.data.map(comment => {
        if (comment._id === action.payload._id) {
          return {
            ...comment,
            observationType: comment.observationType.map(type => {
              if (type._id === action.payload.observationType._id) {
                return action.payload.observationType;
              } else {
                return type;
              }
            }),
          };
        } else {
          return comment;
        }
      });
      return {
        ...state,
        comments: {
          ...state.comments,
          data: {
            ...state.comments.data,
            result: {
              ...state.comments.data.result,
              data: updatedComments,
            },
          },
        },
        error: null,
      };
    
      
    case UPDATE_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_COMMENT_PASS:
      console.log("DELETE_COMMENT_PASS", action.payload.observationByFacultyId);
      return {
        ...state,
        comments: state.comments.filter(
          (comment) =>
            comment.observationByFacultyId !==
            action.payload.observationByFacultyId
        ),
        error: null,
      };
    // adding New types case for delete comment api

    case DELETE_ITEM_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_ITEM_SUCCESS:
      console.log("DELETE_ITEM_SUCCESS", action.payload);
      const filteredComments = state.comments.data.result.data.filter(
        (comment) => comment._id !== action.payload
      );
      console.log("finlinearea conment ", filteredComments);

      return {
        ...state,
        comments: {
          ...state.comments,
          data: {
            result: {
              data: filteredComments,
              observationCount: state.comments.data.result.observationCount,
            },
          },
        },
        isLoading: false,
        error: null,
      };
    case DELETE_ITEM_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // ending
    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_REPLYBYID_PASS:
      return {
        ...state,
        comments: [action.payload],
        error: null,
      };
    case GET_REPLYBYID_FAIL:
      return {
        ...state,
        comments: [],
        error: action.payload,
      };
    case GETSELECTED_REPLY_PASS:
      return {
        ...state,
        comments: [action.payload],
        error: null,
      };
    case GETSELECTED_REPLY_FAIL:
      return {
        ...state,
        comments: [],
        error: action.payload,
      };
    case DELETE_SELECTED_REPLY_PASS:
      console.log("ELETE_SELECTED_REPLY_PASS", action.payload)
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload.observationReplyId
        ),
        error: null,
      };
    case DELETE_SELECTED_REPLY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_REPLY_SUCCESS:
      // Find the comment with matching id and update its replies
      console.log("replyyyyyyy",action.payload)
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment._id === action.payload.data.result.data.parentId) {
            return {
              ...comment,
              replies: [...comment.replies, action.payload.data.result.data],
            };
          } else {
            return comment;
          }
        }),
        error: null,
      };
      case UPDATE_REPLY_PASS:
        console.log("update reply reduer", action.payload)
      const updatedReplies = state.comments.data.result.data.observationReply.map(reply => {
        if (reply._id === action.payload._id) {
          return {
            ...reply,
            comment: action.payload.comment,
          };
        } else {
          return reply;
        }
      });

      return {
        ...state,
        dataValue: updatedReplies,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default commentReducer;
