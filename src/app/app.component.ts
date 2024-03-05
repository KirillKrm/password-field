import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  password: string = '';
  passwordStrength: string = '';
  isShow: boolean = false;

  checkPasswordStrength() {
    if (this.password.length === 0) {
      this.passwordStrength = 'empty';
      return;
    }

    const hasLetter = /[a-zA-Z]/.test(this.password);
    const hasNumber = /[0-9]/.test(this.password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      this.password
    );

    if (this.password.length < 8) {
      this.passwordStrength = 'short';
    } else if (hasLetter && hasNumber && hasSymbol) {
      this.passwordStrength = 'strong';
    } else if (
      (hasLetter && hasSymbol) ||
      (hasLetter && hasNumber) ||
      (hasNumber && hasSymbol)
    ) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'easy';
    }
  }

  toggleVisibility() {
    this.isShow = !this.isShow;
  }
}
