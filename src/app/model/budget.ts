export interface Budget {
  id?: number;
  clientName: string;
  projectName: string;
  requestType: string;
  supplierName: string;
  bankDetails:string;
  wallet:string;
  totAmount: number;
  requestDate:string;
  downPayment: number;
  dpDate:string;
  balance: number;
  paidDate:string;
  status:string;

}
