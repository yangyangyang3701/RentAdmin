let BASE_PATH = ''; // 本地测试

if (process.env.NODE_ENV === 'production') {
  BASE_PATH = 'http://test-api.firshop.com'; // 线上测试环境
}

export default {
  BASE_PATH,
};
