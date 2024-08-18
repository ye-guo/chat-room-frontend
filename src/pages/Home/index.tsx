import AuthForms from '@/components/AuthForms';
import Chat from '@/components/Chat';
import InfoCard from '@/components/InfoCard';
import SessionList from '@/components/SessionList';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import UserList from '@/components/UserList';
import { getCurrentUser } from '@/services/userController/UserController';
import { history, useModel } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';
import styles from './index.less';

export default function HomePage() {
  const { isLogin, showAuthForms, showInfoCard } = useModel('Home.model');
  const { setInitialState } = useModel('@@initialState');

  // 退出登录后销毁当前会话user，登录后重新获取user
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const result = await getCurrentUser();
        return result.data;
      } catch (error) {
        history.push('/');
        message.error('网络繁忙，请稍后重试');
        return undefined;
      }
    };

    if (isLogin) {
      // 用户登录，重新获取用户信息
      fetchUserInfo().then((currentUser) => {
        setInitialState((s) => ({
          ...s,
          currentUser: currentUser,
        }));
      });
    } else {
      // 用户未登录，清空用户信息
      setInitialState((s) => ({
        ...s,
        currentUser: undefined,
      }));
    }
  }, [isLogin, setInitialState]);

  // 禁止组件内右键菜单
  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
  };

  return (
    <div className={styles.home}>
      <div className={styles.container} onContextMenu={handleContextMenu}>
        {showInfoCard && <InfoCard />}
        {showAuthForms ? <AuthForms /> : ''}
        <TopBar />
        <Sidebar />
        <SessionList />
        <Chat />
        <UserList />
      </div>
    </div>
  );
}
