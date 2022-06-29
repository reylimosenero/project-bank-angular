import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Account } from '../model/account';
import { AccountTypeEnum } from '../enums/AccountTypeEnum';
import { Subject, throwError } from "rxjs";

const baseUrl = 'http://localhost:8080/api/v1/accounts';

@Injectable({providedIn: 'root'})
export class AccountService {

    constructor(private http: HttpClient) { }

  save(name: string, accountType: AccountTypeEnum): Observable<any> {
    const postData: Account = {name: name, type: accountType};

    return this.http.post<Account>(
        baseUrl, postData,
        {
            observe: 'response'
        });

  }

  getAll(params: any): Observable<any> {
     return this.http.get<any>(baseUrl, { params });
  }
 
  getAccountById(accNo: number): Observable<any> {
    let getUrl = baseUrl+"/"+accNo;
    console.log("UR: " + getUrl);

    return this.http.get<number>(getUrl, {observe: 'response'});
 }
    
}