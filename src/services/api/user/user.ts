import { request } from '@/utils/request';

export async function getAllUser() {
  return request.get<API.User>('/users');
}

export async function updateUser(user: API.User, currentUserId: string) {
  return request.patch<API.User>('/user/' + user.id, {
    data: {
      currentUserId,
      ...user,
    },
  });
}
