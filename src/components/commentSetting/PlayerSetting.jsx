import React, { useState, useRef } from "react";
import "./QuestionOption.css";
import { FiPlay } from "react-icons/fi";
import { BsPause } from "react-icons/bs";
import { VscUnmute, VscMute } from "react-icons/vsc";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { useDispatch } from "react-redux";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaLightbulb, FaThumbsUp, FaStickyNote } from "react-icons/fa";
import { CgScrollV } from "react-icons/cg";
import { Input, Tabs, Select } from "antd";
import { useEffect } from "react";
import { Tour } from "antd";
import { useSelector } from "react-redux";
import { AddCategoryAction, getCategory } from "../../actions/categoryAction";
import {
  addcomment,
  getAllComments,
  updatePlayersettingData,
} from "../../actions/commentaction";

const TabName = ["Question", "Suggestion", "Strength", "Notes"];
const TabColors = ["#e95505", "#3f9402", "#1b6a95", "#efa900"];
const max = 500;
const min = 100;

const PlayerSetting = (props) => {
  const src = props?.src;

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const playerRef = useRef();
  const [open, setOpen] = useState(false);
  const steps = [
    {
      cover: (
        <>
          <p style={{ fontSize: "15px", font: "Open Sans, sans-serif" }}>
            Click the plus sign to leave comments.
          </p>

          <div
            style={{ borderTop: "solid #000 1px", backgroundColor: "#f9c72f" }}
          >
            ADD TO COMMENT
          </div>
        </>
      ),
      target: () => ref1.current,
    },
    {
      cover: (
        <>
          <p style={{ fontSize: "15px", font: "Open Sans, sans-serif" }}>
            Comments appear as marks on the timeline and also appear below the
            video.
          </p>
          <div
            style={{ borderTop: "solid #000 1px", backgroundColor: "#f9c72f" }}
          >
            <div>COMMENT</div>
          </div>
        </>
      ),
      target: () => ref2.current,
    },
  ];
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const videos = useSelector((state) => state.videoReducer);
  const { user } = useSelector((state) => state.auth);
  const counter = useSelector((state) => state.counter);
  const getAllCategory = useSelector((state) => state.categoryReducer);
  // console.log("get all category.....", getAllCategory);
  const [paused, setpaused] = useState(true);
  const [muted, setmuted] = useState(false);
  const [length, setlength] = useState(null);
  const [formattedLength, setformattedLength] = useState(null);
  const [currentTime, setcurrentTime] = useState(0);
  const [formattedTime, setformattedTime] = useState(null);
  const [counterComponent, setcounterComponent] = useState();
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const { Option, OptGroup } = Select;
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(95);
  const [disableInput, setDisableInput] = useState(true);

  const [textarea, setTextarea] = useState("");
  const [selectData, setSelectData] = useState("");
  const [showQuery, setQuery] = useState("");
  const getVideos = useSelector((state) => state.videoReducer);

  // console.log("showquery", showQuery)
  const Draw = () => {
    const width = Math.floor(Math.random() * (max - min)) + min;
    const height = 320;
    setWidth(width);
    setHeight(height);
    setShow1(true);
  };
  const handleClick = (event) => {
    const v = document.getElementById("v");
    setShow(!show);
    setShow1(false);
    setTarget(event.target);
    setpaused(!paused);
    if (paused == true) {
      v.play();
      setpaused(false);
    } else {
      v.pause();
      setpaused(true);
    }
  };

  const handleTextarea = (event) => {
    setTextarea(event.target.value);
    setDisableInput(event.target.value === "");
  };

  const handleChange = (value) => {
    setSelectData(value);
  };

  window.onload = () => setOpen(true);

  const funcall = () => {
    const curTimeValue =parseInt( formattedTime);
    console.log("curtime v",curTimeValue)
    const v = document.getElementById("v");
    setShow1(false);
    setShow(false);
    v.play();
    setpaused(false);
    let div = document.createElement("div");
    let uppendE1 = (document.getElementById("sug").appendChild(div).style.left = `${parseInt(currentTime*3.7)}%`);
    div.style.backgroundColor = `${(getAllCategory.categories.data.colorCode)}`;
    div.addEventListener(
      "click",
      function () {
        v.currentTime = currentTime;
        v.play();
        setpaused(false);
      },
      false
    );
    console.log("parseInt(formattedTime)", parseInt(formattedTime));
    dispatch(
      addcomment(
        showQuery,
        videos.videos.data._id,
        selectData,
        textarea,
        parseInt(currentTime),
        videos.videos.data.userId,
        videos.videos.data.createdBy,
        true,
        user?.result?.userAuthToken
      )
    )
      .then((data) => {
        console.log("add comment api response", data);

        setLoading(false);
        dispatch(getAllComments(0, 500, getVideos.videos.data._id)).then(
          (res) => {
            console.log("updated comment", res);
          }
        );
      })
      .catch((error) => {
        console.log("add comment error", error);
      });
  };
 
  function play() {
    duration();
    const v = document.getElementById("v");
    const play_pause = document.querySelector(".play_pause");
    setpaused(!paused);
    if (paused === true) {
      v.play();
      setpaused(false);
    } else {
      v.pause();
      setpaused(true);
    }
  }

  function duration() {
    let dur = document.getElementById("v")?.duration;
    dur = dur?.toFixed();
    let formattedLength = dur?.toHHMMSS();
    setlength(dur);
    setformattedLength(formattedLength);
    return dur;
  }
  if (counter?.countDataGlobal?.toCheckClick === true) {
    const time_range = document.querySelector(".time_range");
    document.getElementById("v").currentTime =
      counter?.countDataGlobal?.rangeFormatedTime;
  } else {
  }
  function currentTime2() {
    String.prototype.toHHMMSS = function () {
      let sec_num = parseInt(this, 10);
      let hours = Math.floor(sec_num / 3600);
      let minutes = Math.floor((sec_num - hours * 3600) / 60);
      let seconds = sec_num - hours * 3600 - minutes * 60;
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    };
    let cur = document.getElementById("v")?.currentTime;
    cur = cur?.toFixed();
    let formattedTime = cur?.toHHMMSS();
    setcurrentTime(cur);
    setformattedTime(formattedTime);
    // console.log("timee formarat  "  ,formattedTime )
    if (parseInt(currentTime) === parseInt(length)) {
      setpaused(true);
    }
    dispatch(
      updatePlayersettingData({
        toCheckClick: false,
        rangeFormatedTime: cur,
        hoursFormatedTime: formattedTime,
      })
    );
    return cur;
  }

  function customTime() {
    const time_range = document.querySelector(".time_range");
    document.getElementById("v").currentTime = time_range.value;
    setcurrentTime(time_range.value);
  }
  

  function mute() {
    document.getElementById("v").muted = true;
    setmuted(true);
    if (muted === true) {
      document.getElementById("v").muted = false;
      setmuted(false);
    } else {
      document.getElementById("v").muted = true;
      setmuted(true);
    }
  }

  useEffect(() => {
    setInterval(() => setcurrentTime(currentTime2()), 10);
    setInterval(() => setlength(duration()), 10);

    //api call for getCategory
    dispatch(getCategory(0, 10, true))
      .then((data) => {
        console.log("get Category", data);
        setLoading(false);
        setCategory(data);
      })
      .catch((error) => {
        console.log("get types error", error);
      });
    // add category **************
    // dispatch(
    //   AddCategoryAction(
    //     {
    //       title: "Strengths",
    //       description: "Strength",
    //       colorCode: "#1b6a95",
    //       isActive: true,
    //     },
    //     user?.result?.userAuthToken
    //   )
    // )
    //   .then((data) => {
    //     console.log("1Add types", data);
    //     setLoading(false);
    //     setCategory(data);
    //   })
    //   .catch((error) => {
    //     console.log("add types error", error);
    //   });
  }, []);

  if (loading) {
    return <div>loading ....</div>;
  }

  return (
    <>
      <div className="VideoPlayer">
        <video id="v" width="100%" height="500px" onChange={() => alert("2")}>
          <source src={src} type="video/mp4" />
        </video>

        <div className="controls">
          <div onClick={play} className="play_pause_btn">
            <FiPlay
              size={25}
              color="white"
              className={paused ? "svg_play_pause" : "hide"}
            ></FiPlay>
            <BsPause
              size={25}
              color="white"
              className={paused ? "hide" : "svg_play_pause"}
            ></BsPause>
          </div>
          <div ref={ref} style={{ marginTop: 2 }}>
            <span ref={ref1}></span>

            <Overlay
              show={show}
              target={target}
              placement="top"
              container={ref}
              containerPadding={4}
              onExit={() => setHeight(95)}
            >
              <Popover
                id="popover-contained"
                style={{
                  height: height,
                  width: 360,
                  marginBottom: 25,
                  backgroundColor: "#e9e9e9",
                  zIndex: 9999,
                }}
              >
                <Popover.Body>
                  <Tabs
                    tabPosition="top"
                    typeof="card"
                    defaultActiveKey=""
                    onTabClick={(id) => setQuery(id,)}
                    items={category.result.data.map((cat, index) => {
                      return {
                        label: (
                          <span onClick={() => Draw()} key={index}>
                            {/* <Icon size={30} style={{ color: TabColors[index] }} /> */}
                            <p className="tab" style={{ color: cat.colorCode }}>
                              {cat.title}
                            </p>
                          </span>
                        ),
                        key: cat._id,

                        children: show1 ? (
                          <>
                            <TextArea
                              rows={2}
                              value={textarea}
                              onChange={handleTextarea}
                              required
                            />
                            <span>
                              Link to a professional skill (customizable)
                            </span>
                            <div>
                              <Select
                                className="select-option"
                                showSearch
                                defaultValue="No topic"
                                style={{
                                  width: 327,
                                }}
                                value={selectData}
                                onChange={handleChange}
                                dropdownStyle={{ zIndex: 9999 }}
                              >
                                <Option value="No topic">No topic</Option>
                                <OptGroup label="Set Big Goals">
                                  <Option value="Set big goals"></Option>
                                </OptGroup>
                                <OptGroup label="Continuously Increase Effectiveness">
                                  <Option value="Identify progress & gaps">
                                    Identify progress & gaps
                                  </Option>
                                  <Option value="Identify student behaviors">
                                    Identify student behaviors
                                  </Option>
                                  <Option value="Identify contributing teacher actions">
                                    Identify contributing teacher actions
                                  </Option>
                                  <Option value="Identify underlying factors">
                                    Identify underlying factors
                                  </Option>
                                  <Option value="Access learning experiences">
                                    Access learning experiences
                                  </Option>
                                  <Option value="Adjust cours as necessary">
                                    Adjust cours as necessary
                                  </Option>
                                </OptGroup>
                                <OptGroup label="Execute Effectively">
                                  <Option value="Clearly present academic content">
                                    Clearly present academic content
                                  </Option>
                                  <Option value="Manage student practice">
                                    Manage student practice
                                  </Option>
                                  <Option value="Check for understanding">
                                    Check for understanding
                                  </Option>
                                  <Option value="Communicate high expectations for behavior">
                                    Communicate high expectations for behavior
                                  </Option>
                                  <Option value="Implement & practice time-saving procedures">
                                    Implement & practice time-saving procedures
                                  </Option>
                                </OptGroup>
                                <OptGroup label="Invest Student & Other">
                                  <Option value="Convince student that they can succeed">
                                    Convince student that they can succeed
                                  </Option>
                                  <Option value="Convince student that they want to achieve">
                                    Convince student that they want to achieve
                                  </Option>
                                  <Option value="Leverage role models">
                                    Leverage role models
                                  </Option>
                                  <Option value="Reinforce efforts">
                                    Reinforce efforts
                                  </Option>
                                  <Option value="Create a welcoming environment">
                                    Create a welcoming environment
                                  </Option>
                                  <Option value="Invest students' families and influencers">
                                    Invest students' families and influencers
                                  </Option>
                                </OptGroup>
                                <OptGroup label="Plan Purposefully">
                                  <Option value="Create or obtain assessments">
                                    Create or obtain assessments
                                  </Option>
                                  <Option value="Backwards plan your year and units">
                                    Backwards plan your year and units
                                  </Option>
                                  <Option value="Create objective-driven lesson plan">
                                    Create objective-driven lesson plan
                                  </Option>
                                  <Option value="Differentiate plans">
                                    Differentiate plans
                                  </Option>
                                  <Option value="Establish rules and consequences">
                                    Establish rules and consequences
                                  </Option>
                                  <Option value="Design classroom procedures">
                                    Design classroom procedures
                                  </Option>
                                </OptGroup>
                                <OptGroup label="Work Relentlessly">
                                  <Option value="Persist in the face of considerable challenges">
                                    Persist in the face of considerable
                                    challenges
                                  </Option>
                                  <Option value="Pursue additional instructional time and resources">
                                    Pursue additional instructional time and
                                    resources
                                  </Option>
                                  <Option value="Sustain energy to reach ambitious goals">
                                    Sustain energy to reach ambitious goals
                                  </Option>
                                </OptGroup>
                              </Select>
                            </div>
                            <Button
                              style={{ float: "right" }}
                              onClick={funcall}
                              className="mt-5"
                              type=""
                              color="#c8c8c8"
                              disabled={disableInput}
                            >
                              Submit
                            </Button>{" "}
                          </>
                        ) : (
                          ""
                        ),
                      };
                    })}
                  />
                </Popover.Body>
              </Popover>
            </Overlay>
          </div>

          <input
            type="range"
            id="inputRange"
            className="time_range"
            onChange={customTime}
            value={counter?.countDataGlobal?.rangeFormatedTime}
            step={0.1}
            min={0}
            max={length}
            onClick={handleClick}
          />

          <div id="sug" ref={ref2}></div>

          <Tour
            className="tour"
            placement="top"
            open={open}
            onClose={() => setOpen(false)}
            steps={steps}
          />

          <span className="time">
            <span className="video_time">{formattedTime}</span>
            <span> / </span>
            <span className="video_length">{formattedLength}</span>
          </span>

          <div onClick={mute} className="mute_unmute_btn">
            <VscUnmute
              color="white"
              size={24}
              className={muted ? "hide" : "svg_mute_unmute"}
            ></VscUnmute>

            <VscMute
              color="white"
              size={24}
              className={muted ? "svg_mute_unmute" : "hide"}
            ></VscMute>
          </div>
          <CgScrollV
            style={{
              border: "1px solid white",
              borderRadius: "50%",
              backgroundColor: "white",
            }}
            size={20}
          />
        </div>
      </div>
    </>
  );
};
export default PlayerSetting;
