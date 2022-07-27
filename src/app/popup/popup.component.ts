import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Budget } from '../model/budget';
import { BudgetRequest } from '../service/budget-request.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  @ViewChild('content') addview!: ElementRef;

  frmName: string = 'Request Budget';
  editData: any;
  budgetJson: Budget = {

    client: '',
    projectName: '',
    scopeOfWork: '',
    supplier: '',
    amount: 0.0,
    downPayment: 0.0,
    date: '',
    balance: 0.0,
    name:'',
    status:'pending'
  };

  frmBudget = new FormGroup({
    id: new FormControl({value:0,disabled:true}),
    name: new FormControl('', Validators.required),
    client: new FormControl('', Validators.required),
    projectName: new FormControl(''),
    scopeOfWork: new FormControl(''),
    amount: new FormControl(0.0),
    supplier: new FormControl(''),
    downPayment: new FormControl(0),
    date: new FormControl(''),
    balance: new FormControl(0),
    status: new FormControl(''),
  });

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private budgetService: BudgetRequest
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    //console.log(this.frmBudget.value);
    this.budgetService.save(this.frmBudget).subscribe(response=>{
      console.log(response)
    })
  }

  loadEditData(id: number) {
    this.open();
    this.budgetService.getBudgetById(id).subscribe((response) => {
      this.editData = response;
      this.frmBudget.setValue({
        id: this.editData.id,
        client: this.editData.client,
        projectName: this.editData.projectName,
        scopeOfWork: this.editData.scopeOfWork,
        amount: this.editData.amount,
        supplier: this.editData.supplier,
        downPayment: this.editData.downPayment,
        date: this.editData.date,
        balance: this.editData.balance,
        name: null,
        status:this.editData.status
      })
    });
  }

  open() {
    this.Clearform();
    this.modalService
      .open(this.addview, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  Clearform() {
    this.frmBudget.setValue({
      id: 0,
      name: '',
      client: '',
      projectName: '',
      scopeOfWork: '',
      amount: 0.0,
      supplier: '',
      downPayment: 0.0,
      date: '',
      balance: 0.0,
      status:''
    });
  }

}
