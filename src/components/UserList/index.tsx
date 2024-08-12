import UserItem from '../UserItem';
import styles from './index.less';

export default function UserList() {
  return (
    <div className={styles.user_list}>
      <div className={styles.header}>
        在线人数：
        <span>x</span>
      </div>
      <UserItem />
      <UserItem />
      <UserItem />
    </div>
  );
}
