import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  title: 'Cloud-Fitter',
  hash: true,
  targets: {
    ie: 11,
  },
  antd: {},
  dva: {
    hmr: true,
  },
  dynamicImport: {
    loading: '@/pages/pageLoading',
  },
  request: {
    dataField: 'resData',
  },
  routes,
  proxy: {
    '/ecs': {
      target: 'http://121.41.88.120:8080',
      changeOrigin: true,
    },
  },
  fastRefresh: {},
  baseNavigator: false,
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  locale: {
    default: 'zh-CN',
  },
  theme: {
    '@primary-color': '#3d63d8',
  },
});
