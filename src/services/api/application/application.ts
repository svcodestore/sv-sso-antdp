import { request } from '@/utils/request';

const apiPath = {
  createApplication: '/application',
  deleteApplicationById: '/application/',
  updateApplicationById: '/application/',
  getApplicationById: '/application/',
  getAllApplication: '/applications',
};

export async function createApplication(Application: API.Application, currentUserId: string) {
  return request.post<API.Application>(apiPath.createApplication, {
    data: {
      currentUserId,
      ...Application,
    },
  });
}

export async function deleteApplicationById(id: string) {
  return request.delete(apiPath.deleteApplicationById + id);
}

export async function updateApplicationById(Application: API.Application, currentUserId: string) {
  return request.patch<API.Application>(apiPath.updateApplicationById + Application.id, {
    data: {
      currentUserId,
      ...Application,
    },
  });
}

export async function getApplicationById(id: string) {
  return request.get<API.Application>(apiPath.getApplicationById + id);
}

export async function getAllApplication() {
  return request.getRaw<API.Application[]>(apiPath.getAllApplication);
}
