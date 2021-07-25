import devConfig from './config.dev';
import prodConfig from './config.prod';

// 测试环境
const isDev = process.env.REQUEST_ENV === 'development';
// 正式环境
// const isDev = false;

const commonConfig = {
  CODE_TYPES: {
    NO_PERMISSIONS: -2,
    TOKEN_OVERDUE: -1,
    SYSTEM_ERROR: 1,
  },
};

// eslint-disable-next-line import/no-mutable-exports
let config = { ...commonConfig, ...devConfig };
if (!isDev) {
  config = { ...commonConfig, ...devConfig, ...prodConfig };
}

// console.log('config', config);

export default config;
