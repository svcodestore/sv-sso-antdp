import { request } from '@/utils/request';

/** 获取当前的用户 GET /api/currentUser */
export async function getCurrentUser() {
  return request.get<API.CurrentUser>('/user/current-user');
}

export async function getAllUser() {
  return request.getRaw<API.User[]>('/users');
}

export async function getUserById(id: string) {
  return request.get<API.User>('/user/' + id);
}

export async function delUserById(id: string) {
  return request.delete('/user/' + id);
}

export async function updateUserById(user: Partial<API.User>, currentUserId: string) {
  return request.patch<API.User>('/user/' + user.id, {
    data: {
      currentUserId,
      ...user,
    },
  });
}

export async function createUser(user: Partial<API.User>, currentUserId: string) {
  return request.post<API.User>('/user', {
    data: {
      currentUserId,
      ...user,
    },
  });
}
