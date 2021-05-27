import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  title: 'CloudFitter',
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
  routes,
  proxy: {
    '/apis': {
      target: 'http://localhost:8081',
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
