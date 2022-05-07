import { request } from '@/utils/request';

const apiPath = {
  createApplicationUser: '/application-user',
  deleteApplicationUserById: '/application-user',
  updateApplicationUserById: '/application-user',
  getApplicationUserById: '/application-user',
  getAllApplicationUser: '/application-users',
};

export async function createApplicationUser(
  applicationId: string,
  userId: string,
  currentUserId: string,
) {
  return request.post<API.ApplicationUser>(apiPath.createApplicationUser, {
    data: {
      applicationId,
      userId,
      currentUserId,
    },
  });
}

export async function deleteApplicationUserById(applicationId: string, userId: string) {
  return request.delete(
    apiPath.deleteApplicationUserById + '?applicationId=' + applicationId + '&userId=' + userId,
  );
}

export async function updateApplicationUserById(
  applicationUser: API.ApplicationUser,
  currentUserId: string,
) {
  return request.patch<API.ApplicationUser>(
    apiPath.updateApplicationUserById +
      '?applicationId=' +
      applicationUser.applicationsList.id +
      '&userId=' +
      applicationUser.usersList.id,
    {
      data: {
        currentUserId,
        ...applicationUser,
      },
    },
  );
}

export async function getApplicationUserById(applicationId: string, userId: string) {
  return request.get<API.ApplicationUser>(
    apiPath.getApplicationUserById + '?applicationId=' + applicationId + '&userId=' + userId,
  );
}

export async function getAllApplicationUser() {
  return request.getRaw<API.ApplicationUser[]>(apiPath.getAllApplicationUser);
}
