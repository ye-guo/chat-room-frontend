// 全局共享数据示例
import { getGlobalRoom } from '@/services/chatRoomController/ChatRoomController';
import { message } from 'antd';
import { useEffect, useState } from 'react';

interface msgInfoProps {
  message?: API.Message;
  userVO?: API.UserVO;
}

export default () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showAuthForms, setShowAuthForms] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>('1');
  const [globalRoom, setGlobalRoom] = useState<API.GroupRoom>();
  // 历史消息状态
  const [historyMessages, setHistoryMessages] = useState<API.MsgInfo[]>([]);
  // 新消息状态
  const [messages, setMessages] = useState<API.MsgInfo[]>([]);
  // msgInfo 渲染会话卡片的 信息
  const [msgInfo, setMsgInfo] = useState<msgInfoProps>();
  const [pagination, setPagination] = useState<API.Pagination>({
    currentPage: 2,
    size: 20,
  });

  useEffect(() => {
    getGlobalRoom().then((res) => {
      const groupRoom: API.GroupRoom = res.data;
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
    messages,
    setMessages,
    historyMessages,
    setHistoryMessages,
    msgInfo,
    setMsgInfo,
    pagination,
    setPagination,
  };
};
