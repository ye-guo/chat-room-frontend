import { request } from '@umijs/max';

// 注册
export async function register(
  body: API.RegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.Result>(`/api/user/register`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// 登录
export async function login(
  body: API.LoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.Result>(`/api/user/login`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// 获取当前用户信息
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.Result>(`/api/user/currentUser`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 退出登录
export async function logout(options?: { [key: string]: any }) {
  return request<API.Result>(`/api/user/logout`, {
    method: 'POST',
    ...(options || {}),
  });
}

// upload avatar
export async function uploadAvatar(
  avatar?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();
  if (!avatar) return;
  formData.append('image', avatar);

  return request<API.Result>(`/api/user/upload`, {
    method: 'POST',
    data: formData,
    ...(options || {}),
  });
}
