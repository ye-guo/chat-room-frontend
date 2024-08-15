import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  layout: false,
  routes,
  npmClient: 'pnpm',
});
