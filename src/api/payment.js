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
    RentalId, Months, Amount, Remark,
  }) {
    return this.post('/api/setalreadypay', {
      RentalId,
      Months,
      Amount,
      Remark,
    });
  }
}

export default new PaymentApi();
