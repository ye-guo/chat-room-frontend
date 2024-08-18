import { request } from '@umijs/max';

// 获取全局群聊
export async function getGlobalRoom(options?: { [key: string]: any }) {
  return request<API.Result>(`/api/chatroom/global`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 获取聊天室消息
export async function getMessages(
  roomId: number,
  pageSize: number,
  cursorId?: number,
  options?: { [key: string]: any },
) {
  return request<API.Result>(`/api/chatroom/messages`, {
    method: 'GET',
    params: {
      roomId,
      pageSize,
      cursorId,
    },
    ...(options || {}),
  });
}

// 获取聊天室用户
export async function getGroupUsers(
  roomId: number,
  options?: { [key: string]: any },
) {
  return request<API.Result>(`/api/chatroom/groupUsers`, {
    method: 'GET',
    params: {
      roomId,
    },
    ...(options || {}),
  });
}
