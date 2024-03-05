import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { PasswordStrength } from '../types';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.css',
})
export class PasswordFieldComponent {
  password: string = '';
  passwordStrength = PasswordStrength.EMPTY;
  isShow: boolean = false;

  private getStrength(passwordStrength: PasswordStrength): number {
    switch (passwordStrength) {
      case PasswordStrength.EASY:
        return 0;
      case PasswordStrength.MEDIUM:
        return 1;
      case PasswordStrength.STRONG:
        return 2;
      default:
        throw new Error('Not implemented strength');
    }
  }

  getPasswordStrengthNameclass(offset: number = 0): string | undefined {
    if (this.passwordStrength === PasswordStrength.EMPTY) {
      return 'empty';
    }

    if (this.passwordStrength === PasswordStrength.SHORT) {
      return 'bad';
    }

    const strengthNameclasses = ['bad', 'mediocre', 'good'].map((v, i) => {
      return i >= offset ? v : 'empty';
    });

    const strength = this.getStrength(this.passwordStrength);

    return strengthNameclasses[strength];
  }

  checkPasswordStrength() {
    if (this.password.length === 0) {
      this.passwordStrength = PasswordStrength.EMPTY;
      return;
    }

    const hasLetter = /[a-zA-Z]/.test(this.password);
    const hasNumber = /[0-9]/.test(this.password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      this.password
    );

    if (this.password.length < 8) {
      this.passwordStrength = PasswordStrength.SHORT;
    } else if (hasLetter && hasNumber && hasSymbol) {
      this.passwordStrength = PasswordStrength.STRONG;
    } else if (
      (hasLetter && hasSymbol) ||
      (hasLetter && hasNumber) ||
      (hasNumber && hasSymbol)
    ) {
      this.passwordStrength = PasswordStrength.MEDIUM;
    } else {
      this.passwordStrength = PasswordStrength.EASY;
    }
  }

  toggleVisibility() {
    this.isShow = !this.isShow;
  }
}
