import React, { useEffect, useState, } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import PlayerSetting from "../commentSetting/PlayerSetting";
import Listofcomments from "../newComponents/Listofcomments";
import { Popover } from "antd";
import { getSingleVideos } from "../../actions/videoAction";
import {Spin} from 'antd'

const content = (
  <>
    <h5>Description</h5>
    <div>
      <p className="small">This lesson segment focuses on introducing</p>
    </div>
    <p>Content</p>
  </>
);
const VideoPlayer = () => {
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
console.log("fccc", video)
  const { id } = location?.state;

  useEffect(() => {
    dispatch(getSingleVideos(id))
      .then((data) => {
        setLoading(false);
        setVideo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  if (loading) {
    return <div className="loading"><Spin size="large"/></div>;
  }
  return (
    <>
      <div className="body">
        <header>
          <div className="header">
            <div className="container">
              <nav className="navbar navbar-expand-lg bg-gray">
                <div className="container-fluid text-align-left">
                  <Link
                    className="navbar-brand "
                    to="https://www.edthena.com/"
                    title="Engenia Home"
                  >
                    <img className="logo" src="#" alt="Engenia" />
                  </Link>
                </div>
                <div className="header-link">
                  <Link className="link" to="#">
                    WATCH TOUR VIDEO
                  </Link>
                </div>

                <div className="container-fluid d-flex justify-content-end mb-2">
                  <button className="request">Request more info</button>
                </div>
              </nav>
            </div>
          </div>
        </header>
        <section className="Video_container">
          <div className="convo_container">
            <div className="player_container">
              <div className="player-overlay">
                <div className="dim-background"></div>
              </div>

              {/* <div className="tip-flyouts-overlay"></div> */}
              {/* <div className="tip-timeline-overlay"></div> */}
              <div className="comment_hint">
                <span>Try leaving a comment. Click the plus sign below</span>
              </div>

              <PlayerSetting src={video.result.data.videoUrl} />

              {/* <div className="player"> */}
              {/* <video
                  className="react-player"
                  controls={true}
                  playing='false'
                  ref={videoElement}
                  width="100%"
                  height={450}
                  onTimeUpdate={handleOnTimeUpdate}
                  src={video?.data?.videoUrl}
                >
                  <source src={video?.data?.videoUrl} type="video/mp4" />
                </video> */}

              {/* </div> */}
              <div className="conversation-icon">
                <div className="info-icon">
                  <Popover
                    placement="leftTop"
                    // title={text}
                    content={content}
                    trigger="click"
                  >
                    <a>
                      <FaInfoCircle size={30} />
                    </a>
                  </Popover>
                </div>
                <div className="info-icon">
                  <Popover
                    placement="leftTop"
                    content={content}
                    trigger="click"
                  >
                    <a>
                      <MdGroup size={30} />
                    </a>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Listofcomments />
    </>
  );
};

export default VideoPlayer;
