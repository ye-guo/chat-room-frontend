import { createContext, useContext } from 'react';

// 创建 WebSocket Context
export const WebSocketContext = createContext<WebSocket | null>(null);

// 自定义 Hook，用于方便访问 WebSocket
export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
