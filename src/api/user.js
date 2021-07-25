import BaseApi from './base';

class UserApi extends BaseApi {
  login({
    username, pwd,
  }) {
    return this.post('/login', {
      username, pwd,
    });
  }

  register({
    username, pwd, email,
  }) {
    return this.post('/register', {
      username,
      pwd,
      email,
    });
  }

  resetPwd({
    username, email,
  }) {
    return this.post('/resetpwd', {
      username,
      email,
    });
  }

  setPwd({
    username, oldpwd, newpwd,
  }) {
    return this.post('/setpwd', {
      username,
      oldpwd,
      newpwd,
    });
  }

  logout() {
    return this.post('/logout');
  }
}

export default new UserApi();
