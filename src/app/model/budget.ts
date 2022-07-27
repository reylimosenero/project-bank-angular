export interface Budget {
  id?: number;
  client: string;
  projectName: string;
  scopeOfWork: string;
  supplier: string;
  amount: number;
  downPayment: number;
  date: string;
  balance: number;
  name: string;
  status:string;

  // var formData: any = new FormData();

  // formData.append("id", this.budgetRequest.get('id')?.value);
  // get id:number(){
  //   return
  // }
  // formData.append("client", this.budgetRequest.get('client')?.value);
  // formData.append("projectName", this.budgetRequest.get('projectName')?.value);
  // formData.append("scopeOfWork", this.budgetRequest.get('scopeOfWork')?.value);
  // formData.append("amount", this.budgetRequest.get('amount')?.value);
  // formData.append("supplier", this.budgetRequest.get('supplier')?.value);
  // formData.append("downPayment", this.budgetRequest.get('downPayment')?.value);
  // formData.append("date", this.budgetRequest.get('date')?.value);
  // formData.append("balance", this.budgetRequest.get('balance')?.value);
}
