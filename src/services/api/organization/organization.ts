import { request } from '@/utils/request';

const apiPath = {
  createOrganization: '/organization',
  deleteOrganizationById: '/organization/',
  updateOrganizationById: '/organization/',
  getOrganizationById: '/organization/',
  getAllOrganization: '/organizations',
};

export async function createOrganization(organization: API.Organization, currentUserId: string) {
  return request.post<API.Organization>(apiPath.createOrganization, {
    data: {
      currentUserId,
      ...organization,
    },
  });
}

export async function deleteOrganizationById(id: string) {
  return request.delete(apiPath.deleteOrganizationById + id);
}

export async function updateOrganizationById(
  organization: Partial<API.Organization>,
  currentUserId: string,
) {
  return request.patch<API.Organization>(apiPath.updateOrganizationById + organization.id, {
    data: {
      currentUserId,
      ...organization,
    },
  });
}

export async function getOrganizationById(id: string) {
  return request.get<API.Organization>(apiPath.getOrganizationById + id);
}

export async function getAllOrganization() {
  return request.getRaw<API.Organization[]>(apiPath.getAllOrganization);
}
