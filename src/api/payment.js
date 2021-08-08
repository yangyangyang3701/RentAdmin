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

  end({
    RentalId,
  }) {
    return this.post('/api/setend', {
      RentalId,
    });
  }

  start({
    ApartmentId, StartDate, TenantName, TenantPhone, TenantIdCard,
    PayPeriod, PeriodNum, PeriodFee,
  }) {
    return this.post('/api/setstart', {
      ApartmentId,
      StartDate,
      TenantName,
      TenantPhone,
      TenantIdCard,
      PayPeriod,
      PeriodNum,
      PeriodFee,
    });
  }
}

export default new PaymentApi();
