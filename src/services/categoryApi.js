import axios from "axios";

const API_URL = "http://206.189.143.201:7000";

const Category = async (offset, limit, isActive) => {
  return axios
    .get(API_URL + "/api/observationType", {
      params: {
        offset,
        limit,
        isActive,
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const SingleCategory = async (observationTypeId, userAuthToken) => {
  const headers = {
    "x-access-token": userAuthToken,
    "Content-type": "application/json",
  };
  return axios
    .get(
      API_URL + "/api/observationType",
      {
        observationTypeId,
      },
      { headers }
    )
    .then((response) => {
     return response.data;
    })
    .catch((error) => {
     throw error.response.data;
    });
};
const AddCategory = async (title,description,colorCode,isActive) => {
  const headers = {
    "x-access-token": userAuthToken,
    "Content-type": "application/json",
  };
  return axios
    .post(
      API_URL + "/api/observationType",
      {
        title,
        description,
        colorCode,
        isActive
      },
      { headers }
    )
    .then((response) => {
     return response.data;
    })
    .catch((error) => {
     throw error.response.data;
    });
};

export default {
  Category,
  SingleCategory,
  AddCategory
};
