import { BillPaidStatus } from 'app/shared/model/enumerations/bill-paid-status.model';

export interface IBill {
  id?: number;
  doctorFee?: number;
  medicineCharges?: number;
  testsFee?: number;
  roomCharges?: number;
  otherCharges?: number;
  totalBill?: number;
  paidStatus?: BillPaidStatus;
  patientId?: number;
}

export class Bill implements IBill {
  constructor(
    public id?: number,
    public doctorFee?: number,
    public medicineCharges?: number,
    public testsFee?: number,
    public roomCharges?: number,
    public otherCharges?: number,
    public totalBill?: number,
    public paidStatus?: BillPaidStatus,
    public patientId?: number
  ) {}
}
