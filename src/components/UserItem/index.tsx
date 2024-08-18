import styles from './index.less';

export default function UserItem({ user }: { user: API.UserVo }) {
  const isActive = user.activeStatus === 1;

  return (
    <div className={styles.user_item}>
      <div className={styles.avatar}>
        <img src={user.avatar} alt="avatar" className={styles.avatar} />
        <span
          className={styles.dot}
          style={{ backgroundColor: isActive ? 'green' : '#605e5c' }}
        ></span>
      </div>
      <div className={styles.name}>{user.username}</div>
    </div>
  );
}
