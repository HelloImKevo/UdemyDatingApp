import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

/**
 * Created with command:
 * ```
 * ng g component _forms/text-input --skip-tests
 * ```
 * 
 * UI component representing consolidated member registration forms.
 * Defines an interface that acts as a bridge between the Angular
 * forms API and a native element in the DOM.
 */
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(newValue: any): void { }

  registerOnChange(callbackFunction: any): void { }

  registerOnTouched(callbackFunction: any): void { }

  get control(): FormControl {
    return this.ngControl.control as FormControl
  }
}
