import { request } from '@/utils/request';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser() {
  return request.get<API.CurrentUser>('/user/current-user');
}

// /** 退出登录接口 POST /api/login/outLogin */
export async function outLogin() {
  return request.post('/logout');
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams) {
  return request.post<API.LoginResult>('/login', { data: body });
}

export async function registUser(user: API.User) {
  return request.post('/register', { data: user });
}

export async function getCurrentApplication() {
  return request.get<API.Application>('/application/current-application');
}

export async function getGrantCode(body: API.RequestGrantCodeParams) {
  return request.post<{ code: string }>('/login/oauth2.0/grant-code', { data: body });
}
