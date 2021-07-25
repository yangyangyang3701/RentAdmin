import qs from 'qs';
import request from '../common/request';
import config from '../config';

class BaseApi {
  constructor() {
    this.request = request;
    this.bashUrl = config.BASE_PATH;
  }

  getRequest() {
    return this.request;
  }

  post(url, data, option) {
    return this.request.post(this.bashUrl + url, data, option);
  }

  get(url, data, option) {
    return this.request.get(`${this.bashUrl + url}?${qs.stringify(data)}`, option);
  }

  put(url, data, option) {
    return this.request.put(this.bashUrl + url, data, option);
  }

  delete(url, data, option) {
    return this.request.delete(`${this.bashUrl + url}?${qs.stringify(data)}`, option);
  }
}

export default BaseApi;
