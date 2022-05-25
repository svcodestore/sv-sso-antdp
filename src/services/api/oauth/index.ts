import { request } from '@/utils/request';

const apiPath = {
  logout: '/logout',
  getAccessToken: '/login/oauth2.0/token?',
};

// /** 退出登录接口 POST /api/login/outLogin */
export async function outLogin() {
  return request.post(apiPath.logout);
}

export async function getAccessToken({
  grant_type,
  client_id,
  code,
  redirect_uri,
}: {
  grant_type: 'authorization_code';
  client_id: string;
  code: string;
  redirect_uri: string;
}) {
  return request.post<{ accessToken: string; refreshToken: string; user: API.User }>(
    apiPath.getAccessToken +
      `grant_type=${grant_type}&client_id=${client_id}&code=${code}&redirect_uri=${redirect_uri}`,
  );
}
