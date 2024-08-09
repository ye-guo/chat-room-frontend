import { useState } from "react";
import styles from './index.less'

export default function Message({owner}:{owner?:boolean}) {
  // const [owner, setOwner] = useState(true);
  
  return (
    <div className={`${styles.msg} ${owner ? styles.owner : ''}`}>
      <div className={styles.msg_info}>
        <img
          src="https://cdn.jsdelivr.net/gh/ye-guo/Images/images/81cecc31ebcc31f3631ceb14cc621ed9.jpeg"
          alt="avatar"
        />
        <span>time</span>
      </div>
      <div className={styles.msg_content}>hello!</div>
    </div>
  );
}
