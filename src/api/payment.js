import BaseApi from './base';

class PaymentApi extends BaseApi {
  getList({
    payrecord,
  }) {
    return this.post('/getdata', {
      payrecord,
    });
  }

  create({
    RentalId, Months, Amount, Remark,
  }) {
    return this.post('/setalreadypay', {
      RentalId,
      Months,
      Amount,
      Remark,
    });
  }
}

export default new PaymentApi();
