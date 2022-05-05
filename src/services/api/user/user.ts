import { request } from '@/utils/request';

export async function getAllUser() {
  return request.getRaw<API.User[]>('/users');
}

export async function getUserById(id: string) {
  return request.get<API.User>('/user/' + id);
}

export async function updateUser(user: API.User, currentUserId: string) {
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
