import React from "react";
import styles from "../VideoPlaylist/Styles/header.module.css";

const Header = () => {

  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.nav_logo}>
          <img
            className={styles.nav_logo_icon}
            src="#"
            width="45"
            alt="Engenia"
          />
          <span className={styles.nav_logo_text}>Video PlayList</span>
        </div>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};

export default Header;