import styles from './index.less'

export default function SessionEntry() {
  return (
    <div className={styles.entry}>
      <img
        src="https://cdn.jsdelivr.net/gh/ye-guo/Images/images/api1.jpg"
        alt="avatar"
        className={styles.avatar}
      />
      <div className={styles.entry_info}>
        <h3>name</h3>
        <p>message</p>
      </div>
      <div className={styles.time}>
        just now
      </div>
    </div>
  );
}
