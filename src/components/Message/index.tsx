import formatDate from '@/utils/formatDate';
import { useModel } from '@umijs/max';
import styles from './index.less';

interface messageProps {
  owner?: boolean;
  msg?: API.MsgInfo;
}

export default function Message({ msg }: messageProps) {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState as {
    currentUser?: API.UserVo;
  };
  // 自己消息反转渲染
  const owner = msg?.message?.fromUid === currentUser?.id ? true : false;

  return (
    <div className={`${styles.msg} ${owner ? styles.owner : ''}`}>
      <div className={styles.left}>
        <img className={styles.avatar} src={msg?.userVo?.avatar} alt="avatar" />
        <span className={styles.time}>
          {formatDate(msg?.message?.createTime)}
        </span>
      </div>
      <div className={styles.right}>
        <div className={styles.name}>{msg?.userVo?.username}</div>
        <div className={styles.msg_content}>{msg?.message?.content}</div>
      </div>
    </div>
  );
}
