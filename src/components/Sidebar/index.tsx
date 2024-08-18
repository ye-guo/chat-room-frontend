import Chat from '@/assets/chat.svg';
import Friend from '@/assets/friend.svg';
import { logout } from '@/services/userController/UserController';
import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useModel } from '@umijs/max';
import { Avatar, Button, message } from 'antd';
import NavButton from '../NavButton';
import styles from './index.less';

export default function Sidebar() {
  const { isLogin, setIsLogin, setShowInfoCard } = useModel('Home.model');
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser as API.UserVo;
  const location = useLocation();
  // 获取当前 URL 的路径
  const currentPath = location.pathname;

  return (
    <div className={styles.sidebar}>
      <div className={styles.me}>
        {isLogin && currentUser?.avatar ? (
          <img
            src={`${currentUser?.avatar}`}
            alt="avatar"
            className={styles.avatar}
            onClick={() => {
              setShowInfoCard(true);
            }}
          />
        ) : (
          <Avatar size={59.25} icon={<UserOutlined />} />
        )}
        {isLogin ? (
          <div className={styles.name}>{currentUser?.username}</div>
        ) : (
          <div className={styles.name}>name</div>
        )}
      </div>
      <NavButton icon={Chat} active={currentPath === '/'} />
      {isLogin ? (
        <NavButton
          icon={Friend}
          active={currentPath === '/contact'}
          onClick={() => {
            message.info('功能暂未开放');
          }}
        />
      ) : (
        ''
      )}
      <div className={styles.bottom}>
        <div style={{ marginBottom: '1rem' }}>
          <a
            href="https://github.com/ye-guo/chat-room-backend"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <GithubOutlined style={{ fontSize: '2.5rem' }} />
          </a>
        </div>

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
