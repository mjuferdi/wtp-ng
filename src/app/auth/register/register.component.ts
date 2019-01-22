import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user.model';

@Component({
  selector: 'wtp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errors: any[] = [];
  registerForm: FormGroup;
  user: User;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'passwordConfirmation') })
  }

  private matchingPasswords(passKey: string, passConfirmKey: string) {
    return (group: FormGroup) => {
      const pass = group.controls[passKey];
      const passConfirm = group.controls[passConfirmKey];
      return pass.value !== passConfirm.value ? passConfirm.setErrors({ isSame: true }) : passConfirm.setErrors(null);
    };
  }

  isInvalidForm(fieldName): boolean {
    return this.registerForm.controls[fieldName].invalid &&
      (this.registerForm.controls[fieldName].dirty || this.registerForm.controls[fieldName].touched)
  }

  isRequired(fieldName): boolean {
    return this.registerForm.controls[fieldName].errors.required
  }

  register() {
    this.user = new User();
    this.user.username = this.registerForm.value.username;
    this.user.email = this.registerForm.value.email;
    this.user.firstname = this.registerForm.value.firstname;
    this.user.lastname = this.registerForm.value.lastname;
    this.user.password = this.registerForm.value.password;
    this.user.passwordConfirmation = this.registerForm.value.passwordConfirmation;

    this.auth.register(this.user).subscribe(
      () => {
          this.router.navigate(['/login', {registered: 'success'}]);
      },
      (errorResponse) => {
          this.errors = errorResponse.error.errors;
      })
  }
}
