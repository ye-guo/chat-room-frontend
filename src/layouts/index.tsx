import WebSocketProvider from '@/components/WebSocketContext';
import { Outlet, useModel } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';

export default function Layout() {
  const { initialState } = useModel('@@initialState');
  const { setIsLogin } = useModel('Home.model');
  const { currentUser } = initialState as {
    currentUser?: API.UserVO;
  };

  useEffect(() => {
    const init = () => {
      if (!currentUser) {
        message.error('未登录');
        return;
      }
      setIsLogin(true);
    };
    init();
  }, []);

  return (
    <WebSocketProvider>
      <Outlet />
    </WebSocketProvider>
  );
}
