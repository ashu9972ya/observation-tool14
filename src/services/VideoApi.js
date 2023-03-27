import axios from "axios";

const API_URL = "http://206.189.143.201:7000";

const getVideo = async (offset, limit, userId) => {
  return axios
    .get(
      API_URL +
        `/api/observationVideo?offset=${offset}&limit=${limit}&userId=${userId}`
    )
    .then((response) => response.data)
    .catch((error) => {
      error.response.data;
    });
};
const uploadVideo = async (
  videoUrl,
  userId,
  reviewedBy,
  reviewStatus,
  isActive,
  userAuthToken
) => {
  const headers = {
    "x-access-token": userAuthToken,
    "Content-type": "application/json",
  };
  return axios
    .post(
      API_URL + "/api/observationVideo",
      {
        videoUrl,
        userId,
        reviewedBy,
        reviewStatus,
        isActive,
      },
      { headers }
    )
    .then((response) => {
      response.data;
    })
    .catch((error) => {
      error.response.data;
    });
};

const singleVideo = async (observationVideoId) => {
  try {
    const response = await axios.get(API_URL + `/api/observationVideo/${observationVideoId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export default {
  getVideo,
  uploadVideo,
  singleVideo,
};
