import Chat from '@/assets/chat.svg';
import Friend from '@/assets/friend.svg';
import { useModel } from '@umijs/max';
import { Button } from 'antd';
import NavButton from '../NavButton';
import styles from './index.less';

export default function Sidebar() {
  const { isLogin } = useModel('Home.model');

  return (
    <div className={styles.sidebar}>
      <div className={styles.me}>
        <img
          src="https://cdn.jsdelivr.net/gh/ye-guo/Images/images/81cecc31ebcc31f3631ceb14cc621ed9.jpeg"
          alt="avatar"
          className={styles.avatar}
        />
        <div className={styles.name}>name</div>
      </div>
      <NavButton icon={Chat} />
      {isLogin ? <NavButton icon={Friend} /> : ''}
      <div className={styles.bottom}>
        {isLogin ? <Button className={styles.logout_btn}>Logout</Button> : ''}
        <div className={styles.logo}>YGChat</div>
      </div>
    </div>
  );
}
