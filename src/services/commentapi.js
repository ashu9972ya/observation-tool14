import axios from "axios";

const API_URL = "http://206.189.143.201:7000";
const TOKEN_GETTING =  JSON.parse(localStorage.getItem("TOKEN"));
axios.defaults.headers.post['Content-Type'] = 'application/json';

const getAllcommentapi = async (offset, limit, observationVideoId) => {
  try {
    const result = await axios.get(API_URL + "/api/ObservationByFaculty", {
      params: {
        offset,
        limit,
        observationVideoId,
      },
    });
    return result;
  } catch (err) {
    return err;
  }
};

const postcomments = async (
  observationTypeId,
  observationVideoId,
  relatedTo,
  comment,
  videoTime,
  userId,
  createdBy,
  isActive,
  userAuthToken
) => {
  const headers = {
    "x-access-token": TOKEN_GETTING,
  };
  try {
    const res = await axios.post(
      API_URL + "/api/ObservationByFaculty",
      {
        observationTypeId,
        observationVideoId,
        relatedTo,
        comment,
        videoTime,
        userId,
        createdBy,
        isActive,
      },
      { headers }
    );
    console.log("responsig api......." ,res)
    return res;
  } catch (error) {
    return error;
  }
};

const getCommentById = async (observationByFacultyId, userAuthToken) => {
  const headers = {
    "x-access-token": userAuthToken,
    "Content-type": "application/json",
  };
  try {
    const response = await axios.get(
      API_URL + "/api/ObservationByFaculty",
      {
        observationByFacultyId,
      },
      { headers }
    );
    return response;
  } catch (error) {
    return error;
  }
};

const AddReplyApi = async (
  observationByFacultyId,
  parentId,
  comment,
  userId,
  createdBy,
  isActive,
) => {
  const headers = {
    "x-access-token": TOKEN_GETTING,
  };
  try {
    const response = await axios.post(
      API_URL + "/api/observationReply",
      {
        observationByFacultyId,
        parentId,
        comment,
        userId,
        createdBy,
        isActive,
      },
      { headers }
    );
    console.log('add reply response,...',response)
    return response;
  } catch (error) {
    return error;
  }
};
const updateComment = async (
  observationByFacultyId ,
  observationTypeId,
  observationVideoId,
  relatedTo,
  comment,
  videoTime,
  userId,
  createdBy,
  isActive,
  // userAuthToken
) => {

  try {
    const response = await axios.post(
      `${API_URL}/api/ObservationByFaculty/${observationByFacultyId}`,
      {
        observationTypeId,
        observationVideoId,
        relatedTo,
        comment,
        videoTime,
        userId,
        createdBy,
        isActive,
      },
    );
    console.log("updated comment action ", response.data)
    return response;
  } catch (error) {
    return error;
  }
};
const DeleteComment = async (commentId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/ObservationByFaculty/${commentId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
const getReplyById = async (observationReplyId, userAuthToken) => {
  const headers = {
    "x-access-token": userAuthToken,
    "Content-type": "application/json",
  };
  try {
    const response = await axios.get(
      API_URL + "/api/ObservationByFaculty",
      {
        observationReplyId,
      },
      { headers }
    );
    return response;
  } catch (error) {
    return error;
  }
};

const updateReply = async (
  observationReplyId,
  observationByFacultyId,
  parentId,
  comment,
  userId,
  createdBy,
  isActive,
  userAuthToken
) => {
  const headers = {
    "x-access-token": userAuthToken,
    "Content-type": "application/json",
  };
  try {
    const response = await axios.post(
      `${API_URL}/api/observationReply/${observationReplyId}`,
      {
        observationByFacultyId,
        parentId,
        comment,
        userId,
        createdBy,
        isActive,
      },
      { headers }
    );
    return response;
  } catch (error) {
    return error;
  }
};
const getSelectedReply = async (observationReplyId, userAuthToken) => {
  const headers = {
    "x-access-token": userAuthToken,
    "Content-type": "application/json",
  };
  try {
    const response = await axios.get(
      API_URL + "/api/observationReply",
      {
        observationReplyId,
      },
      { headers }
    );
    return response;
  } catch (error) {
    return error;
  }
};
const deleteSelectedReply = async (observationReplyId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/observationReply/${observationReplyId}`,
    );
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  getAllcommentapi,
  postcomments,
  getCommentById,
  AddReplyApi,
  updateComment,
  DeleteComment,
  updateReply,
  getSelectedReply,
  deleteSelectedReply,
  getReplyById,
};
