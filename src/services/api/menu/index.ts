import { request } from '@/utils/request';

const apiPath = {
  getMenus: '/user-menus',
};

export async function getMenus(applicationId: string, userId: string) {
  return request.get<API.Menu[]>(
    apiPath.getMenus + '?applicationId=' + applicationId + '&userId=' + userId,
  );
}
