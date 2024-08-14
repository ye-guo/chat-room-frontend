// 全局共享数据示例
import { useState } from 'react';

interface msgInfoProps {
  message?: API.Message;
  userVO?: API.UserVO;
};

export default () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showAuthForms, setShowAuthForms] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>('1');
  const [globalRoom, setGlobalRoom] = useState<API.GroupRoom>();
  // 历史消息状态
  // const [historyMessages, setHistoryMessages] = useState<API.MsgInfo[]>([]);
  // 新消息状态
  const [messages, setMessages] = useState<API.MsgInfo[]>([]);
  // msgInfo 渲染会话卡片的 信息
  const [msgInfo, setMsgInfo] = useState<msgInfoProps>();
  const [pagination, setPagination] = useState<API.Pagination>();

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
    msgInfo,
    setMsgInfo,
    pagination,
    setPagination
  };
};
