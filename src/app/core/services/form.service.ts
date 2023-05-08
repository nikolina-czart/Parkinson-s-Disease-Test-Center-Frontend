import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  getFormControl(formGroup: FormGroup, formControlName: string): FormControl {
    return formGroup.get(formControlName) as FormControl
  }

  isControlValid(formGroup: FormGroup, formControlName: string): boolean {
    return this.getFormControl(formGroup, formControlName).valid
  }

  mapErrorMessages(formGroup: FormGroup, formControlName: string): string {
    const formControl = this.getFormControl(formGroup, formControlName)
    if(formControl.hasError('required')){
      return "Field is mandatory"
    }
    if(formControl.hasError('email')){
      return "Incorrect email format"
    }
    if(formControl.hasError('maxlength')){
      console.log(formControl.getError('maxlength'))
      const {requiredLength} = formControl.getError('maxlength')
      return `Maximum number of characters: ${requiredLength}`
    }
    if(formControl.hasError('minlength')){
      const {requiredLength} = formControl.getError('minlength')
      return `Minimum number of characters: ${requiredLength}`
    }
    if(formControl.hasError('matching')){
      return "Passwords must be the same"
    }

    return ""
  }
}
