export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: './home',
  },
  {
    path: '/',
    component: '../layouts/basic',
    routes: [
      {
        path: '/ecs',
        component: './ecs',
      },
      {
        path: '/billing',
        component: './billing',
      },
      {
        component: './exception/404',
      },
    ],
  },
  {
    component: './exception/404',
  },
];
