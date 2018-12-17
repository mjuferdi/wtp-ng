import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'wtp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  returnUrl: string;
  registerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.registerForm = this.fb.group({
      username:   ["", Validators.compose([Validators.required, Validators.minLength(4)])],
      firstname:  ["", Validators.compose([Validators.required, Validators.minLength(4)])],
      lastname:   ["", Validators.compose([Validators.required, Validators.minLength(4)])],
      c_password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      password:   ["", Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  onSubmit() {
    //this.authenticationService.register()
    //  .subscribe(
    //    data => {
    //      this.router.navigate([this.returnUrl]);
    //    },
    //    error => {

    //    });
  }

  get username() { return this.registerForm.get('username'); }
  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get c_password() { return this.registerForm.get('c_password'); }
  get password() { return this.registerForm.get('password'); }
}
