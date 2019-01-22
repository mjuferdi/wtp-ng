import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthModule } from '../auth.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { User } from '../shared/user.model';
import { AuthService } from '../shared/auth.service';

describe('Register form should', () => {

  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const routes: Routes = [
    { path: 'login', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', redirectTo: '/register', pathMatch: 'full' }
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        AuthModule,
        HttpClientModule
      ],
      declarations: [
      ],
      providers: [
        AuthService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(RegisterComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  }));

  it('be invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('emit a user when submitting', () => {
    let username = component.registerForm.controls['username'];
    let email = component.registerForm.controls['email'];
    let firstname = component.registerForm.controls['firstname'];
    let lastname = component.registerForm.controls['lastname'];
    let password = component.registerForm.controls['password'];
    let passwordConfirmation = component.registerForm.controls['passwordConfirmation'];
    username.setValue("tester");
    email.setValue("tester@web.de");
    firstname.setValue("theo");
    lastname.setValue("tester");
    password.setValue("a123");
    passwordConfirmation.setValue("a123");

    inject([AuthService], (auth) => {
      let user: User;
      expect(auth).toBeDefined();
      auth.register().subscibe((value) => user = value);
      component.register();

      expect(user.email).toBe("tester@web.de");
      expect(user.password).toBe("a123");
    })
  });

  describe('have an INVALID field', () => {

    it('email when empty', () => {
      let email = component.registerForm.controls['email'];
      expect(email.valid).toBeFalsy();
    });

    it('email when wrong formatting', () => {
      let errors = {};
      let email = component.registerForm.controls['email'];
      email.setValue("wrongMail");
      errors = email.errors || {};
      expect(errors['pattern']).toBeTruthy();
    });

    it('passwordConfirmation when not equal to password', () => {
      let username = component.registerForm.controls['username'];
      let email = component.registerForm.controls['email'];
      let firstname = component.registerForm.controls['firstname'];
      let lastname = component.registerForm.controls['lastname'];
      let password = component.registerForm.controls['password'];
      let passwordConfirmation = component.registerForm.controls['passwordConfirmation'];
      username.setValue("tester");
      email.setValue("tester@web.de");
      firstname.setValue("theo");
      lastname.setValue("tester");
      password.setValue("a123");
      passwordConfirmation.setValue("b123");

      expect(component.registerForm.valid).toBeFalsy();
    });

  });

  describe('have a VALID field', () => {

    it('email when correct formatting', () => {
      let errors = {};
      let email = component.registerForm.controls['email'];
      email.setValue("email@web.de");
      errors = email.errors || {};
      expect(errors['pattern']).toBeFalsy();
    });

    it('passwordConfirmation when equal to password', () => {
      let username = component.registerForm.controls['username'];
      let email = component.registerForm.controls['email'];
      let firstname = component.registerForm.controls['firstname'];
      let lastname = component.registerForm.controls['lastname'];
      let password = component.registerForm.controls['password'];
      let passwordConfirmation = component.registerForm.controls['passwordConfirmation'];
      username.setValue("tester");
      email.setValue("tester@web.de");
      firstname.setValue("theo");
      lastname.setValue("tester");
      password.setValue("a123");
      passwordConfirmation.setValue("a123");

      expect(component.registerForm.valid).toBeTruthy();
    });
  });
});
