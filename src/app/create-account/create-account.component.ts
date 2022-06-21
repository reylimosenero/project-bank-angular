import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountTypeEnum } from '../enums/AccountTypeEnum';
import { AccountTypeUtility } from '../enums/AccountTypeUtility';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  accountTypeList: AccountTypeEnum[] = AccountTypeUtility.getListAccounts();
  createAccountForm: FormGroup;

  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      'accountName': new FormControl('', [Validators.required]),
      'accountNumber': new FormControl('', [Validators.required]),
      'accountType': new FormControl(AccountTypeEnum.CHECKINGS, [Validators.required]),
      'balance': new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    this.createAccountForm.markAllAsTouched();
  }
}
