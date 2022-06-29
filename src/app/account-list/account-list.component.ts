import {Component, OnInit, ViewChild} from '@angular/core';
import { Account } from '../model/account';
import { AccountService } from '../service/account.service';
import { AlertComponent } from '../alert/alert.component';
import { AlertType } from '../enums/AlertType';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  @ViewChild('alertComponent', {static: false}) alertComponent: AlertComponent;
  accounts: Account[] = [];
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3,6,9];

  constructor(private accountService: AccountService,
    private route:ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.retrieveAccounts();
  }

  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  retrieveAccounts(): void {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.accountService.getAll(params).subscribe({
        next: (response) => {
          console.log(response);
          const {content, totalElements} = response;
          this.accounts = content;
          this.count = totalElements;
        },
        error: (e) => {
          console.error(e)
          this.alertComponent.showAlert(AlertType.DANGER, 'Error Retrieving Account List...');
        },
        complete: () => console.info('complete')
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveAccounts();
  }
  
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveAccounts();
  }

  editAccount(account: Account): void {
    this.router.navigate(['edit' +'/' + account.id], {relativeTo: this.route, 
      queryParamsHandling: 'preserve'});
  }

  deleteAccount(account: Account): void {
    console.log(account);
    this.accountService.delete(account.id? account.id : 0).subscribe({
      next: (response) => {
        console.log(response);
        this.alertComponent.showAlert(AlertType.SUCCESS, "Success deleted...");
        this.retrieveAccounts();
      },
      error: (e) => {
        console.error(e)
        this.alertComponent.showAlert(AlertType.DANGER, 'Error Deleting Account List...');
      },
      complete: () => console.info('complete')
    });
  }

}