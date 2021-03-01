import React from "react";

import styles from "./Splash.module.css";

const Splash: React.FC = () => (
  <div className={styles.FullScreen}>
    <div className={styles.Pulser}>Loading App...</div>
  </div>
);

export default Splash;
