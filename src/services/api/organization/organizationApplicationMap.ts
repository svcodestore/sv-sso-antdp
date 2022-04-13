import { request } from '@/utils/request';

const apiPath = {
  createOrganizationApplication: '/organization-application',
  deleteOrganizationApplicationById: '/organization-application',
  updateOrganizationApplicationById: '/organization-application',
  getOrganizationApplicationById: '/organization-application',
  getAllOrganizationApplication: '/organization-applications',
};

export async function createOrganizationApplication(
  organizationApplication: API.OrganizationApplication,
  currentUserId: string,
) {
  return request.post<API.OrganizationApplication>(apiPath.createOrganizationApplication, {
    data: {
      currentUserId,
      ...organizationApplication,
    },
  });
}

export async function deleteOrganizationApplicationById(
  organizationId: string,
  applicationId: string,
) {
  return request.delete(
    apiPath.deleteOrganizationApplicationById +
      '?organizationId=' +
      organizationId +
      '&applicationId=' +
      applicationId,
  );
}

export async function updateOrganizationApplicationById(
  organizationApplication: API.OrganizationApplication,
  currentUserId: string,
) {
  return request.patch<API.OrganizationApplication>(
    apiPath.updateOrganizationApplicationById +
      '?organizationId=' +
      organizationApplication.organizationsList.id +
      '&applicationId=' +
      organizationApplication.applicationsList.id,
    {
      data: {
        currentUserId,
        ...organizationApplication,
      },
    },
  );
}

export async function getOrganizationApplicationById(
  organizationId: string,
  applicationId: string,
) {
  return request.get<API.OrganizationApplication>(
    apiPath.getOrganizationApplicationById +
      '?organizationId=' +
      organizationId +
      '&applicationId=' +
      applicationId,
  );
}

export async function getAllOrganizationApplication() {
  return request.get<API.OrganizationApplication[]>(apiPath.getAllOrganizationApplication);
}
