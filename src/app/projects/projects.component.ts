import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { ProjectService } from '../service/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  list:any;
  item:boolean = true;

  @ViewChild(PopupComponent) adview !: PopupComponent;

  constructor(private service: ProjectService) {
    this.retrieveAll();
    this.service._refreshRequired.subscribe(response=>{
      this.retrieveAll();
    })
  }

  ngOnInit(): void {

  }

  retrieveAll(): void {
    this.service.getAll().subscribe({
        next: (response) => {
          console.log(response);
          this.list = response;
        },
        error: (e) => {
          console.error(e)

        },
        complete: () => this.adview.showBtn()
      });
  }

  onEdit(id:number){
   this.adview.projectEditData(id)
  }

  onDelete(id:number){
    this.service.delete(id).subscribe({
      next: (response) => {
        console.log(response);
        this.retrieveAll();
      },
      error: (e) => {
        console.error(e)
       // this.alertComponent.showAlert(AlertType.DANGER, 'Error Retrieving Account List...');
      },
      complete: () => console.info('complete')
    });
  }

}
