import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.scss']
})
export class EditableFieldComponent {
  @Input() value: string;

  @Output() saved: EventEmitter<string> = new EventEmitter<string>();

  isEditing = false;
  currentValue = '';

  onEdit() {
    this.currentValue = this.value;
    this.isEditing = true;
  }

  onCancel() {
    this.isEditing = false;
    this.currentValue = this.value;
  }

  onSave() {
    this.isEditing = false;
    this.saved.emit(this.currentValue);
  }
}
