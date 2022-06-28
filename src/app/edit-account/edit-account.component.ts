import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { AlertType } from '../enums/AlertType';
import { Account } from '../model/account';
import { AccountService } from '../service/account.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  editAccountForm: FormGroup;
  @ViewChild('alertComponent', {static: false}) alertComponent: AlertComponent;
  account: Account;

  constructor(private accountService: AccountService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.editAccountForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
    });
    this.retrieveAccounts();
    console.log(this.account);
  }

  retrieveAccounts(): void {
    const id = +this.route.snapshot.params['id'];
    this.accountService.get(id).subscribe({
      next: (response) => {
        console.log(response);
        this.account = response;
        this.editAccountForm.patchValue({
          'name': this.account.name
        });
      },
      error: (e) => {
        console.error(e)
        this.alertComponent.showAlert(AlertType.DANGER, 'Error Retrieving Account...');
      },
      complete: () => console.info('complete')
    });
  }

  onSubmit() {
    this.account.name = this.editAccountForm.get('name')?.value;
    this.accountService.update(this.account).subscribe({
      next: (response) => {
        this.alertComponent.showAlert(AlertType.SUCCESS, 
          'Account is successfully updated.');
      },
      error: (e) => {
        console.error(e)
        this.alertComponent.showAlert(AlertType.DANGER, 'Error Updating Account...');
      },
      complete: () => console.info('complete')
    });
  }

}
