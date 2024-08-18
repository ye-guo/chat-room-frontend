// 运行时配置

import { history, RequestConfig } from '@umijs/max';
import { message } from 'antd';
import { getCurrentUser } from './services/userController/UserController';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  currentUser?: API.UserVo;
  fetchUserInfo?: () => Promise<API.UserVo | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const result = await getCurrentUser();
      return result.data;
    } catch (error) {
      history.push('/');
      message.error('网络繁忙,稍后重试');
    }
    return undefined;
  };

  const currentUser = await fetchUserInfo();

  return {
    fetchUserInfo,
    currentUser,
  };
}

export const request: RequestConfig = {
  // 多环境设置
  baseURL:
    process.env.NODE_ENV === 'production' ? 'https://chat.yeguo.icu' : '',
  withCredentials: true,
};
