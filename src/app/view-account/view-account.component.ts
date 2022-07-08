import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { AlertType } from '../enums/AlertType';
import { Account } from '../model/account';
import { AccountService } from '../service/account.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent implements OnInit {

  viewAccountForm: FormGroup;
  @ViewChild('alertComponent', {static: false}) alertComponent: AlertComponent;
  account: Account;

  constructor(private accountService: AccountService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.viewAccountForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
    });
    this.retrieveAccounts();
    console.log("this.account: "+this.account);
  }

  retrieveAccounts(): void {
    console.log("id: "+ JSON.stringify(this.route.snapshot.params));
    const id = +this.route.snapshot.params['id'];
    this.accountService.get(id).subscribe({
      next: (response) => {
        console.log(response);
        this.account = response;
        this.viewAccountForm.patchValue({
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
    this.account.name = this.viewAccountForm.get('name')?.value;
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
