import BaseApi from './base';

class PaymentApi extends BaseApi {
  getList({
    payrecord,
  }) {
    return this.post('/api/getdata', {
      payrecord,
    });
  }

  create({
    RentalId, MonthNum, Amount, Remark,
  }) {
    return this.post('/api/setalreadypay', {
      RentalId,
      MonthNum,
      Amount,
      Remark,
    });
  }
}

export default new PaymentApi();
