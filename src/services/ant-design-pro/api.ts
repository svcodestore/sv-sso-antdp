import { request } from '@/utils/request';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser() {
  return request.get<{
    data: API.CurrentUser;
  }>('/currentUser');
}

// /** 退出登录接口 POST /api/login/outLogin */
export async function outLogin() {
  return request.post('/logout');
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams) {
  return request.post<API.LoginResult>('/login', { data: body });
}

export async function registUser(user: any) {
  return request.post('/user', { data: user });
}

export async function getAllUser() {
  return request.get<API.User>('/users');
}
