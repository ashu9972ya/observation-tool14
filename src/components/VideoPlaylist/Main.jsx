import React, { useState, useEffect } from "react";
import Table from "./MuiTable";
import styles from "./Styles/main.module.css";
import { UploadVideo } from "./UploadVideo";
import { useSelector, useDispatch } from "react-redux";
import { getAllVideos } from "../../actions/videoAction";
import { getProfile } from "../../actions/auth";
import {Spin} from 'antd'

const Main = () => {
  const dispatch = useDispatch();
  const [videoData, setVideoData] = useState([]);
  const [checkFlag, setcheckFlag] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const getAllVideo = useSelector((state) => state.videoReducer);
  console.log("Main PLAYERRRRRRRRRRR"  , getAllVideo)
  useEffect(() => {
    if (currentUser) {
      dispatch(getAllVideos(0, 10, currentUser?._id))
        .then((data) => {
          if(data === undefined){
            setcheckFlag(false)
          }
          else{
            setcheckFlag(true)
          }
          setVideoData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.result?.userAuthToken) {
      dispatch(getProfile(currentUser.result.userAuthToken));
    }
  }, [currentUser?.result?.userAuthToken]);

  return (
    <div>
      {
        checkFlag? (<div> <main className={styles.main_section}>
          <div className={styles.container}>
            <div className={styles.search_section}>
              <UploadVideo />
            </div>
            <Table products={videoData?.result?.data} />
          </div>
          </main> </div>):(<div className="loading"><Spin size="large"/></div>)
      }
    </div>
  
  );
};

export default Main;

