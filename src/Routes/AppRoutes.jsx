import { Routes, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../App.css";
import Home from "../components/Home";
import Login from "../components/Login"
import Register from "../components/Register";
import Profile from "../components/Profile";
import ForgotPassword from "../components/ForgetPassword";
import VideoPlayer from "../components/classroomTool/VideoPlayer";
import VideoIndex from "../components/VideoPlaylist/VideoIndex";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videoindex" element={<VideoIndex />} />
        <Route path="/videoplayer" element={<VideoPlayer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
