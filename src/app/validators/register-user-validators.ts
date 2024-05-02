import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static passwordMatch(passwordControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const confirmPassword = control.root.get(passwordControlName)?.value;
      return password === confirmPassword ? null : { passwordMatch: true };
    };
  }

  static dateOfBirth(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    const differenceInYears = currentDate.getFullYear() - selectedDate.getFullYear();
    return differenceInYears >= 13 ? null : { dateOfBirth: true };
  }
}