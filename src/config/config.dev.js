let BASE_PATH = ''; // 本地测试

if (process.env.NODE_ENV === 'production') {
  BASE_PATH = 'http://sensorapi.norra.cn:9110'; // 线上测试环境
}

export default {
  BASE_PATH,
};
