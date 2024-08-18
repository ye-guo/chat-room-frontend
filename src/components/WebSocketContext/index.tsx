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
  const { setMessageStore } = useModel('Home.model');

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
        // console.log('Received message:', event.data);
        // event.data type MsgInfo或CursorResponse 类型
        const cursorData = JSON.parse(event.data);

        let historicalMessages: API.MsgInfo[] = [];
        // 是否是游标分页数据
        if (isCursorData(cursorData)) {
          // 历史聊天消息
          historicalMessages = cursorData.records.map(
            (record: API.MsgInfo) => ({
              message: record.message,
              userVo: record.userVo,
            }),
          );

          // 历史消息倒序
          const hMReverse: API.MsgInfo[] = historicalMessages.reverse();

          setMessageStore((prevStore) => {
            const lastRoomData = prevStore[cursorData.roomId] || {
              messages: [],
              historyMessages: [],
              cursorId: 0,
            };

            return {
              ...prevStore,
              [cursorData.roomId]: {
                ...lastRoomData,
                // 设置游标
                cursorId: cursorData.cursorId,
                // 更新历史消息
                historyMessages: [
                  ...lastRoomData.historyMessages,
                  ...hMReverse,
                ],
                messages: [...lastRoomData.messages],
              },
            };
          });

          return;
        }

        // 实时消息响应回来data
        // {"message":{"id":385,"roomId":1,"fromUid":12,"content":"26","isRead":0,"createTime":1723792012000,"updateTime":1723792012000,"isDeleted":0},
        // "userVo":{"id":12,"email":"aidjajd@163.com","username":"yeguo","avatar":"https://cdn.jsdelivr.net/gh/ye-guo/Images/images/81cecc31ebcc31f3631ceb14cc621ed9.jpeg","gender":-1,"activeStatus":0,"createTime":1723376065000,"updateTime":1723376065000}}
        const sigleData = JSON.parse(event.data);
        setMessageStore((prevStore) => {
          // 获取当前房间的数据，或者初始化为空
          const lastRoomData = prevStore[sigleData.message.roomId] || {
            cursorId: 0,
            historyMessages: [],
            messages: [],
          };

          // 将新的消息数据添加到当前房间的消息列表中
          const newMessages = [...lastRoomData.messages, sigleData];

          // 如果消息列表发生了变化，则更新状态
          if (
            JSON.stringify(newMessages) !==
            JSON.stringify(lastRoomData.messages)
          ) {
            console.log('****** 实时消息：', sigleData);
            console.log('****** 实时消息 newMessages：', newMessages);
            console.log('****** 实时消息房间：', sigleData.message.roomId);

            return {
              ...prevStore,
              [sigleData.message.roomId]: {
                ...lastRoomData,
                // 实时消息不设置游标
                messages: newMessages,
                historyMessages: lastRoomData.historyMessages,
              },
            };
          }
          // 如果没有实际变化，则返回之前的状态
          return prevStore;
        });
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
