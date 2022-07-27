import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, tap } from 'rxjs';
import { Budget } from '../model/budget';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class BudgetRequest {




  _refreshRequired = new Subject<void>();

  save(frmBudget: FormGroup) {
    return this.http.post<Budget>(environment.budgetUrl, frmBudget.getRawValue()).pipe(
      tap(()=>{
        this._refreshRequired.next();
      })
    );
  }

  constructor(private http: HttpClient) {}

  getAllBudgetRequest(): Observable<any> {
    console.log('title from env '+environment.title);
    return this.http.get<any>(environment.budgetUrl);

  }



  getBudgetById(id: number): Observable<BudgetRequest> {
    console.log('title from env '+environment.title);
    return this.http.get<BudgetRequest>(environment.budgetUrl + '/' + id);
    
  }


  delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.budgetUrl + '/' + id);
  }

}
