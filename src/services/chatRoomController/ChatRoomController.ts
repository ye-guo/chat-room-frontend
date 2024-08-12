import { request } from '@umijs/max';

// 获取全局群聊
export async function getGlobalRoom(options?: { [key: string]: any }) {
  return request<API.Result>(`/api/chatroom/global`, {
    method: 'GET',
    ...(options || {}),
  });
}
