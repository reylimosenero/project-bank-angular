import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { AlertType } from '../enums/AlertType';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-get-account',
  templateUrl: './get-account.component.html',
  styleUrls: ['./get-account.component.css']
})
export class GetAccountComponent implements OnInit {

  specificAccountForm: FormGroup;
  hasResult = false;
  @ViewChild('alertComponent', {static: false}) alertComponent: AlertComponent;

  constructor(private accService: AccountService) { }

  ngOnInit(): void {
    this.specificAccountForm = new FormGroup({
      'acctNumber': new FormControl('', [Validators.required]),
      'accName': new FormControl(),
      'accType': new FormControl(),
      'accBal': new FormControl()
    });
  }

  onSubmit() {
    const acctNumber = this.specificAccountForm.value['acctNumber'];
    this.accService.getAccountById(acctNumber).subscribe({
      next: (response) => {
        this.hasResult = true;
        this.specificAccountForm.controls['acctNumber'].setValue(response.body.acctNumber);
        this.specificAccountForm.controls['acctNumber'].disable();
        this.specificAccountForm.controls['accName'].setValue(response.body.name);
        this.specificAccountForm.controls['accName'].disable();
        this.specificAccountForm.controls['accType'].setValue(response.body.type);
        this.specificAccountForm.controls['accType'].disable();
        this.specificAccountForm.controls['accBal'].setValue(response.body.balance);
        this.specificAccountForm.controls['accBal'].disable()
        this.alertComponent.showAlert(AlertType.INFO, 
          'Account details for Account Number: ' + acctNumber + '. ' );
      },
      error: (e) => {
        console.error(e)
        this.alertComponent.showAlert(AlertType.WARNING, 'Error getting account ' + acctNumber);
      },
      complete: () => console.info('complete')
    });
    

  }

  clearField() {
    this.hasResult = false;
    this.specificAccountForm.reset();
    this.specificAccountForm.controls['acctNumber'].enable();
    this.alertComponent.hideAlert();
  }

}
