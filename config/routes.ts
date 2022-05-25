export default [
  {
    path: '/callback',
    layout: false,
    component: './Auth',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    component: './Dashboard',
  },
  {
    path: '/organization',
    name: 'organization',
    icon: 'team',
    routes: [
      {
        path: '/organizations',
        name: 'organizations',
      },
      {
        hideInMenu: true,
        path: '/organization/:id',
        name: 'organizationEdit',
        component: './organization/Edit',
      },
      {
        path: '/organization-application',
        name: 'organization-application',
      },
    ],
  },
  {
    hideInMenu: true,
    path: '/organizations',
    component: './organization/List',
  },
  {
    hideInMenu: true,
    path: '/new-organization',
    component: './organization/New',
  },
  {
    hideInMenu: true,
    path: '/organization-application',
    component: './organization/OrganizationApplicationMapList',
  },
  {
    hideInMenu: true,
    path: '/new-organization-map-application',
    component: './organization/OrganizationApplicationMapList/New',
  },
  {
    path: '/user',
    name: 'user',
    icon: 'user',
    routes: [
      {
        hideInMenu: true,
        path: '/user/:id',
        name: 'userDetail',
        component: './user/Detail',
      },
      {
        path: '/users',
        name: 'users',
        component: './user/List',
      },
    ],
  },
  {
    hideInMenu: true,
    path: '/users',
    component: './user/List',
  },
  {
    hideInMenu: true,
    path: '/new-user',
    component: './user/New',
  },
  {
    path: '/application',
    name: 'application',
    icon: 'appstore',
    routes: [
      {
        path: '/applications',
        name: 'applications',
      },
      {
        hideInMenu: true,
        path: '/application/:id',
        component: './application/Edit',
      },
      {
        path: '/application-user',
        name: 'application-user',
      },
    ],
  },
  {
    hideInMenu: true,
    path: '/new-application',
    component: './application/New',
  },
  {
    hideInMenu: true,
    path: '/applications',
    component: './application/List',
  },
  {
    hideInMenu: true,
    path: '/application-user',
    component: './application/ApplicationUserMapList',
  },
  {
    hideInMenu: true,
    path: '/new-application-map-user',
    component: './application/ApplicationUserMapList/New',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
