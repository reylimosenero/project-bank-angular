import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AppRoutingModule } from './app-routing-module';
import { AccountListComponent } from './account-list/account-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertComponent } from './alert/alert.component';
import { GetAccountComponent } from './get-account/get-account.component';
import { EditDeleteButtonComponent } from './edit-delete-button/edit-delete-button.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
// import { DepositWithdrawAccountComponent } from './deposit-withdraw-account/deposit-withdraw-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateAccountComponent,
    AccountListComponent,
    AlertComponent,
    GetAccountComponent,    
    EditDeleteButtonComponent,
    EditAccountComponent,
    // DepositWithdrawAccountComponent,
    ViewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
