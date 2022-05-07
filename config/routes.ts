export default [
  {
    path: '/login',
    layout: false,
    component: './Login',
    routes: [
      {
        path: '/oauth2.0',
        routes: [
          {
            path: '/authorize',
            component: './Login',
          },
        ],
      },
    ],
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
