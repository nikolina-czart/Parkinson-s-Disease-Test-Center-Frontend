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
      return "Pole jest obowiązkowe"
    }
    if(formControl.hasError('email')){
      return "Nieprawidłowy format email"
    }
    if(formControl.hasError('maxlength')){
      console.log(formControl.getError('maxlength'))
      const {requiredLength} = formControl.getError('maxlength')
      return `Maksymalna ilość znaków: ${requiredLength}`
    }
    if(formControl.hasError('minlength')){
      const {requiredLength} = formControl.getError('minlength')
      return `Minimalna ilość znaków: ${requiredLength}`
    }
    if(formControl.hasError('matching')){
      return "Hasła muszą być takie same"
    }

    return ""
  }
}
