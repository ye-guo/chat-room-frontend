import Chat from '@/assets/chat.svg';
import Friend from '@/assets/friend.svg';
import { logout } from '@/services/userController/UserController';
import { UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Avatar, Button, message } from 'antd';
import NavButton from '../NavButton';
import styles from './index.less';

export default function Sidebar() {
  const { isLogin, setIsLogin } = useModel('Home.model');
  const { initialState } = useModel('@@initialState');
  const { username, avatar } = initialState?.currentUser || {};

  return (
    <div className={styles.sidebar}>
      <div className={styles.me}>
        {isLogin ? (
          <img src={avatar} alt="avatar" className={styles.avatar} />
        ) : (
          <Avatar size={59.25} icon={<UserOutlined />} />
        )}
        {isLogin ? (
          <div className={styles.name}>{username}</div>
        ) : (
          <div className={styles.name}>name</div>
        )}
      </div>
      <NavButton icon={Chat} />
      {isLogin ? <NavButton icon={Friend} /> : ''}
      <div className={styles.bottom}>
        {isLogin ? (
          <Button
            className={styles.logout_btn}
            onClick={async () => {
              const result = await logout();
              if (!result.data) {
                message.error('Logout failed');
                return;
              }
              message.success('登出' + result.message);
              setIsLogin(false);
            }}
          >
            登出
          </Button>
        ) : (
          ''
        )}
        <div className={styles.logo}>YGChat</div>
      </div>
    </div>
  );
}
