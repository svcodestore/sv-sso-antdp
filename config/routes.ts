export default [
  {
    path: '/login',
    layout: false,
    component: './Login',
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
    path: '/organization-application',
    component: './organization/OrganizationApplicationMapList',
  },
  {
    path: '/user',
    name: 'user',
    icon: 'user',
    routes: [
      {
        path: '/users',
        name: 'users',
      },
    ],
  },
  {
    hideInMenu: true,
    path: '/users',
    component: './user/List',
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
        path: '/application-user',
        name: 'application-user',
      },
    ],
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
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
