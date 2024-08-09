import { defineConfig } from '@umijs/max';
import routes from './routes';
import proxy from './proxy';
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

