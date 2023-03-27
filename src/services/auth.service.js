import axios from "axios";

const API_URL = "http://206.189.143.201:7000";

const register = async (name, email, password, role) => {
  try {
    const response = await axios.post(API_URL + "/api/register", {
      name,
      email,
      password,
      role,
    });
    localStorage.setItem("TOKEN", JSON.stringify(response));
  } catch (er) {
    alert(er.response.data);
    console.log(" register auth service error", er.response.data);
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "/api/login", {
      username,
      password,
    });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("TOKEN", JSON.stringify(response.data.result.userAuthToken));
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error status:", error.response.status);
      console.log("Error message:", error.response.data);
    } else if (error.request) {
      console.log("No response from server:", error.request);
    } else {
      console.log("Error:", error.message);
    }
    throw error;
  }
};


const profile=async (userAuthToken)=>{
 const headers={
    'x-access-token': userAuthToken,
    'Content-type': 'application/json'
  }
  try {
    const response = await axios.get(API_URL + "/api/users/myprofile", { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Failed to fetch profile data');
  }
}
const forgetPassword = ( email) => {
  return axios.post(API_URL + "/api/forgotpassword", { 
    email
  });
};


const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  forgetPassword,
  profile
};
