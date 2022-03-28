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
    component: './organization/List',
    // routes: [
    //   {
    //     component: './404',
    //   },
    // ],
  },
  {
    path: '/user',
    name: 'user',
    icon: 'user',
    component: './user/List',
    // routes: [
    //   {
    //     component: './404',
    //   },
    // ],
  },
  {
    path: '/application',
    name: 'application',
    icon: 'appstore',
    component: './application/List',
    // routes: [
    //   {
    //     component: './404',
    //   },
    // ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
