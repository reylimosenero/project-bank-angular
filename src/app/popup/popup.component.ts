import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BudgetRequest } from '../service/budget-request.service';
import { ProjectService } from '../service/projects.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  @ViewChild('templateProject') addview!: ElementRef;
  @ViewChild('templateBudget') addBudgetview!: ElementRef;

  showBudget = true;

  frmName: string = '';
  editData: any;
  projectData: any;

  frmProject = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    clientName: new FormControl('', Validators.required),
    projectName: new FormControl(''),
    uom: new FormControl(''),
    quantity: new FormControl(0.0),
    dateInquiry: new FormControl(''),
    dateTimeStarted: new FormControl(''),
    dateTimeDelivered: new FormControl(''),
    status: new FormControl(''),
  });

  frmBudget = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    clientName: new FormControl('', Validators.required),
    projectName: new FormControl(''),
    requestType: new FormControl(''),
    supplierName: new FormControl(''),
    bankDetails: new FormControl(''),
    wallet: new FormControl(''),
    totAmount: new FormControl(0.0),
    requestDate: new FormControl(''),
    downPayment: new FormControl(0.0),
    dpDate: new FormControl(''),
    balance: new FormControl(0.0),
    paidDate: new FormControl(''),
    status: new FormControl(''),
  });

  constructor(
    private modalService: NgbModal,
    private budgetService: BudgetRequest,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    //console.log(this.frmBudget.value);
    this.budgetService.save(this.frmBudget).subscribe((response) => {
      console.log(response);
    });
  }

  submitProject() {
    console.log(this.frmProject.value);
    this.projectService.save(this.frmProject).subscribe((response) => {
      console.log(response);
    });
  }

  open() {
    this.frmName = 'Budget Request';
    this.Clearform();
    //console.log(this.frmProject)
    this.modalService
      .open(this.addBudgetview, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  showBtn() {
    this.showBudget = false;
    console.log('called' + this.showBudget);
  }

  loadEditData(id: number) {
    this.showBudget = true;
    //this.showProject =false;
    this.open();
    this.budgetService.getBudgetById(id).subscribe((response) => {
      this.editData = response;
      this.frmBudget.setValue({
        id: this.editData.id,
        clientName: this.editData.clientName,
        projectName: this.editData.projectName,
        requestType: this.editData.requestType,
        supplierName: this.editData.supplierName,
        bankDetails: this.editData.bankDetails,
        wallet: this.editData.wallet,
        totAmount: this.editData.totAmount,
        requestDate: this.editData.requestDate,
        downPayment: this.editData.downPayment,
        dpDate: this.editData.dpDate,
        balance: this.editData.balance,
        paidDate: this.editData.paidDate,
        status: this.editData.status,
      });
    });
  }

  popProject() {
    this.frmName = 'Projects ';
    this.modalService
      .open(this.addview, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  projectEditData(id: number) {
    this.popProject();
    this.projectService.getById(id).subscribe((response) => {
      this.projectData = response;
      this.frmProject.setValue({
        id: this.projectData.id,
        clientName: this.projectData.clientName,
        projectName: this.projectData.projectName,
        uom: this.projectData.uom,
        quantity: this.projectData.quantity,
        dateInquiry: this.projectData.dateInquiry,
        dateTimeStarted: this.projectData.dateTimeStarted,
        dateTimeDelivered: this.projectData.dateTimeDelivered,
        status: this.projectData.status,
      });
    });
  }

  Clearform() {
    this.frmBudget.setValue({
      id: 0,
      clientName: '',
      projectName: '',
      requestType: '',
      supplierName: '',
      bankDetails: '',
      wallet: '',
      totAmount: 0.0,
      requestDate: '',
      downPayment: 0.0,
      dpDate: '',
      balance: 0.0,
      paidDate: '',
      status: '',
    });
  }
}
