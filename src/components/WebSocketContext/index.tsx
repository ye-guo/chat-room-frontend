import { WS } from '@/constants';
import { WebSocketContext } from '@/hooks/useWebSocket';
import isPaginationData from '@/utils/isPaginationData';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';

export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { setMessages, setHistoryMessages } = useModel('Home.model');

  useEffect(() => {
    let reconnectAttempts = 0;
    // 获取全局群聊信息并建立 WebSocket 连接

    const connectWebSocket = () => {
      const newWs = new WebSocket(WS);

      newWs.onopen = () => {
        console.log('WebSocket connection established');
        reconnectAttempts = 0; // 重置重连尝试次数
        setWs(newWs); // 设置ws实例
      };

      newWs.onmessage = (event) => {
        console.log('Received message:', event.data);
        const paginationData = JSON.parse(event.data);

        let historicalMessages: API.MsgInfo[] = [];
        // 将事件数据转换为 Pagination 类型
        if (isPaginationData(paginationData)) {
          // paginationData存在，并且records存在
          historicalMessages = paginationData.records.map(
            (record: API.MsgInfo) => ({
              message: record.message,
              userVO: record.userVO,
            }),
          );

          const hMReverse: API.MsgInfo[] = historicalMessages.reverse();

          // 现在可以安全地访问 pagination 对象的属性
          setHistoryMessages((prevMessages: API.MsgInfo[]) => [
            ...prevMessages, // 1 2 3 4 5 6     6 5 4 3 2 1
            ...hMReverse, //    7 8 9 10 11 12   12 11 10 9 8 7
          ]);
          return;
        }

        const newMessage: API.MsgInfo = JSON.parse(event.data);
        setMessages((prevMessages: API.MsgInfo[]) => [
          ...prevMessages,
          newMessage,
        ]);
      };

      newWs.onclose = () => {
        console.log('WebSocket connection closed');
        if (reconnectAttempts < 5) {
          const timeout = Math.min(1000 * 2 ** reconnectAttempts, 30000);
          setTimeout(connectWebSocket, timeout);
          reconnectAttempts++;
        } else {
          message.error('无法连接服务器，请尝试刷新页面');
        }
      };

      newWs.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
}
