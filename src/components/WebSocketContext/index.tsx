import { WebSocketContext } from '@/hooks/useWebSocket';
import { getGlobalRoom } from '@/services/chatRoomController/ChatRoomController';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';

export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { setGlobalRoom, setMessages } = useModel('Home.model');

  useEffect(() => {
    let reconnectAttempts = 0;
    // 获取全局群聊信息并建立 WebSocket 连接
    getGlobalRoom().then((res) => {
      const groupRoom: API.GroupRoom = res.data;
      if (!groupRoom) {
        message.error(res.message);
        return;
      }

      setGlobalRoom(groupRoom);
      console.log(groupRoom);

      const connectWebSocket = () => {
        const newWs = new WebSocket(`ws://localhost:8080/api/ws/chat?type=1`);

        newWs.onopen = () => {
          console.log('WebSocket connection established');
          reconnectAttempts = 0; // 重置重连尝试次数
          setWs(newWs);
        };

        newWs.onmessage = (event) => {
          console.log('Received message:', event.data);
          const newMessage = event.data;
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        newWs.onclose = () => {
          console.log('WebSocket connection closed');
          if (reconnectAttempts < 5) {
            const timeout = Math.min(1000 * 2 ** reconnectAttempts, 30000);
            setTimeout(connectWebSocket, timeout);
            reconnectAttempts++;
          } else {
            message.error('无法重新连接，请刷新页面');
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
    });
  }, []);

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
}
