import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Budget } from '../model/budget';
import { PopupComponent } from '../popup/popup.component';
import { BudgetRequest } from '../service/budget-request.service';


@Component({
  selector: 'budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css'],
})
export class BudgetListComponent implements OnInit {
  budgetList: any;
  item: string = 'yes';

  @ViewChild(PopupComponent) adview!: PopupComponent;

  constructor(private budgetRequestService: BudgetRequest) {
    this.retrieveBudgets();
    this.budgetRequestService._refreshRequired.subscribe((response) => {
      this.retrieveBudgets();
    });
  }

  ngOnInit(): void {

  }

  retrieveBudgets(): void {
    this.budgetRequestService.getAllBudgetRequest().subscribe({
      next: (response) => {
        console.log(response);
        this.budgetList = response;
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => console.info('complete'),
    });
  }

  onEdit(id: number) {
    this.adview.loadEditData(id);

  }

  onDelete(id: number) {
    this.budgetRequestService.delete(id).subscribe({
      next: (response) => {
        console.log(response);
        this.retrieveBudgets();
        //this.budgetList = response;
      },
      error: (e) => {
        console.error(e);
        // this.alertComponent.showAlert(AlertType.DANGER, 'Error Retrieving Account List...');
      },
      complete: () => console.info('complete'),
    });
  }
}
