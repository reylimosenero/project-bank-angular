import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountTypeEnum } from '../enums/AccountTypeEnum';
import { AccountTypeUtility } from '../enums/AccountTypeUtility';
import { AccountService } from '../service/account.service';
import { AlertComponent } from '../alert/alert.component';
import { AlertType } from '../enums/AlertType';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  accountTypeList: String[] = AccountTypeUtility.getListAccounts();
  createAccountForm: FormGroup;
  @ViewChild('alertComponent', {static: false}) alertComponent: AlertComponent;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    console.log(this.accountTypeList);
    this.createAccountForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'acctType': new FormControl(AccountTypeEnum.CHECKINGS, [Validators.required]),
    });
   
  }

  onSubmit(): void {
    const name = this.createAccountForm.get('name')?.value;
    const acctType = this.createAccountForm.get('acctType')?.value;
    this.accountService.save(name, acctType).subscribe({
      next: (response) => {
        this.alertComponent.showAlert(AlertType.SUCCESS, 
          'Account Created with Account Number: ' + response.body.acctNumber +'.');
      },
      error: (e) => {
        console.error(e)
        this.alertComponent.showAlert(AlertType.DANGER, 'Error Creating Account...');
      },
      complete: () => console.info('complete')
    });
    
    this.createAccountForm.markAllAsTouched();
  }
}
