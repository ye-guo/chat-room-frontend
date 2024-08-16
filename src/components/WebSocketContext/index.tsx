import { WS } from '@/constants';
import { WebSocketContext } from '@/hooks/useWebSocket';
import isCursorData from '@/utils/isCursorData';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';

export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { setMessages, setHistoryMessages, setCursorId } =
    useModel('Home.model');

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
        const data = JSON.parse(event.data);

        let historicalMessages: API.MsgInfo[] = [];
        // 是否是游标分页数据
        if (isCursorData(data)) {
          // 历史聊天消息
          historicalMessages = data.records.map((record: API.MsgInfo) => ({
            message: record.message,
            userVo: record.userVo,
          }));
          // 设置游标
          setCursorId(data.cursorId);
          // 历史消息倒序
          const hMReverse: API.MsgInfo[] = historicalMessages.reverse();

          // 设置共享model
          setHistoryMessages((prevMessages: API.MsgInfo[]) => [
            ...prevMessages, // 1 2 3 4 5 6     6 5 4 3 2 1
            ...hMReverse, //    7 8 9 10 11 12   12 11 10 9 8 7
          ]);
          return;
        }
        // 实时聊天消息
        setMessages((prevMessages: API.MsgInfo[]) => [...prevMessages, data]);
      };

      newWs.onclose = () => {
        console.log('WebSocket connection closed');
        if (reconnectAttempts < 10) {
          const timeout = Math.min(1000 * 2 ** reconnectAttempts, 60000);
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
