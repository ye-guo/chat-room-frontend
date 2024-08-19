// 全局共享数据示例
import { getGlobalRoom } from '@/services/chatRoomController/ChatRoomController';
import { message } from 'antd';
import { useEffect, useState } from 'react';

interface msgInfoProps {
  message?: API.Message;
  userVo?: API.UserVo;
}

export default () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showAuthForms, setShowAuthForms] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>('1');
  const [globalRoom, setGlobalRoom] = useState<API.GroupRoom>();
  const [msgInfo, setMsgInfo] = useState<msgInfoProps>(); // msgInfo 渲染会话卡片的 信息
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [messageStore, setMessageStore] = useState<{
    [roomId: number]: {
      historyMessages: API.MsgInfo[];
      messages: API.MsgInfo[];
      cursorId: number;
    };
  }>({});

  useEffect(() => {
    getGlobalRoom().then((res) => {
      const groupRoom: API.GroupRoom = res?.data;
      if (!groupRoom) {
        message.error(res.message);
        return;
      }
      setGlobalRoom(groupRoom);
    });
  }, []);

  return {
    isLogin,
    setIsLogin,
    showAuthForms,
    setShowAuthForms,
    activeKey,
    setActiveKey,
    globalRoom,
    setGlobalRoom,
    msgInfo,
    setMsgInfo,
    messageStore,
    setMessageStore,
    showInfoCard,
    setShowInfoCard,
  };
};
