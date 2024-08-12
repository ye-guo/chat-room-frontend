import { useModel } from '@umijs/max';
import styles from './index.less';

export default function SessionEntry() {
  const { globalRoom } = useModel('Home.model');

  return (
    <div className={styles.entry}>
      <img src={globalRoom?.avatar} alt="avatar" className={styles.avatar} />
      <div className={styles.entry_info}>
        <div className={styles.name}>{globalRoom?.name}</div>
        <div className={styles.msg}>message</div>
      </div>
      <div className={styles.time}>just now</div>
    </div>
  );
}
