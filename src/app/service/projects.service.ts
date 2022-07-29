import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, tap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project';


@Injectable({ providedIn: 'root' })

export class ProjectService {


  constructor(private http: HttpClient) {}

  _refreshRequired = new Subject<void>();

  save(frmGroup: FormGroup) {
    return this.http.post<Project>(environment.projectsUrl, frmGroup.getRawValue()).pipe(
      tap(()=>{
        this._refreshRequired.next();
      })
    );
  }

  getAll(): Observable<any> {
    console.log('title from env '+environment.title);
    return this.http.get<any>(environment.projectsUrl);

  }

  getById(id: number): Observable<Project> {
    console.log('title from env '+environment.title);
    return this.http.get<any>(environment.projectsUrl + '/' + id);

  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.projectsUrl + '/' + id);
  }

}
