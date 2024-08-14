import formatDate from '@/utils/formatDate';
import { useModel } from '@umijs/max';
import styles from './index.less';

export default function SessionEntry() {
  const { globalRoom, msgInfo } = useModel('common');
  // msgInfo 渲染会话卡片的 信息
  return (
    <div className={styles.entry}>
      <img src={globalRoom?.avatar} alt="avatar" className={styles.avatar} />
      <div className={styles.entry_info}>
        <div className={styles.name}>{globalRoom?.name}</div>
        {msgInfo ? (
          <div className={styles.msg}>
            {msgInfo?.userVO?.username}:
            {msgInfo?.message?.content}
          </div>
        ) : (
          <div className={styles.msg}></div>
        )}
      </div>
      {msgInfo ? (
        <div className={styles.time}>
          {formatDate(msgInfo?.message?.createTime)}
        </div>
      ) : (
        <div className={styles.time}></div>
      )}
    </div>
  );
}
