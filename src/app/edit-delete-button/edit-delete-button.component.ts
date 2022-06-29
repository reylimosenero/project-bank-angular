import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-delete-button',
  templateUrl: './edit-delete-button.component.html',
  styleUrls: ['./edit-delete-button.component.css']
})
export class EditDeleteButtonComponent implements OnInit {

  @Input ('value') value: any;
  @Output ('delete') delete = new EventEmitter<any>();
  @Output ('edit') edit = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  onEdit() {
    this.edit.emit(this.value);
  }

  onDelete() {
    this.delete.emit(this.value);
  }

}
