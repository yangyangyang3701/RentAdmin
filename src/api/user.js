import BaseApi from './base';

class UserApi extends BaseApi {
  login({
    username, pwd,
  }) {
    return this.post('/api/login', {
      username, pwd,
    });
  }

  register({
    username, pwd, email,
  }) {
    return this.post('/api/register', {
      username,
      pwd,
      email,
    });
  }

  resetPwd({
    username, email,
  }) {
    return this.post('/api/resetpwd', {
      username,
      email,
    });
  }

  setPwd({
    username, oldpwd, newpwd,
  }) {
    return this.post('/api/setpwd', {
      username,
      oldpwd,
      newpwd,
    });
  }

  logout() {
    return this.post('/api/logout');
  }
}

export default new UserApi();
