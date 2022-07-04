import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from '../model/account';
import { AccountService } from '../service/account.service';
import { AlertComponent } from '../alert/alert.component';
import { AlertType } from '../enums/AlertType';
import { Deposit } from '../model/deposit';

@Component({
  selector: 'app-deposit-withdraw-account',
  templateUrl: './deposit-withdraw-account.component.html',
  styleUrls: ['./deposit-withdraw-account.component.css']
})
export class DepositWithdrawAccountComponent implements OnInit {

  depositType: string;
  accounts: Account[];
  @ViewChild('alertComponent', {static: false}) alertComponent: AlertComponent;
  withdrawDepositAccountForm: FormGroup;

  constructor(private accountService: AccountService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.depositType = data['type']);
    let params: any = {};
    this.accountService.getAll(params).subscribe({
      next: (response) => {
        console.log(response);
        this.accounts = response.content;
      },
      error: (e) => {
        console.error(e)
        this.alertComponent.showAlert(AlertType.DANGER, 'Error Retrieving Account List...');
      },
      complete: () => console.info('complete')
    });
    this.withdrawDepositAccountForm = new FormGroup({
      'acctId': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    let deposit: Deposit = {type: this.depositType, amount: this.getAmount()?.value};

    this.accountService.depositWithdrawAccount(deposit, this.getAcctId()?.value)
    .subscribe({
      next: (response) => {
        this.alertComponent.showAlert(AlertType.SUCCESS, 
          'Transaction successful.');
      },
      error: (e) => {
        console.error(e)
        this.alertComponent.showAlert(AlertType.DANGER, 'Error Transaction...');
      },
      complete: () => console.info('complete')
    });
  }

  getAcctId() {
    return this.withdrawDepositAccountForm.get('acctId');
  }

  getAmount() {
    return this.withdrawDepositAccountForm.get('amount');
  }
}
