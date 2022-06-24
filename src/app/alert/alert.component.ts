import { Component, OnInit } from '@angular/core';
import { AlertType } from '../enums/AlertType';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {

  isShow: boolean = false;
  message: String = '';
  alertType: AlertType = AlertType.SUCCESS;

  constructor() { }

  ngOnInit(): void {
  }

  public showAlert(alertType: AlertType, message: String) {
    this.alertType = alertType;
    this.message = message;
    this.isShow = true;
  }

  public hideAlert(): void {
    this.isShow = false;
  }
}
