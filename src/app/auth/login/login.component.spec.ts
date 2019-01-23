import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthModule } from '../auth.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { User } from '../shared/user.model';
import { AuthService } from '../shared/auth.service';

describe('Login form should', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  }));

  it('be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('emit a user when submitting', () => {
    let email = component.loginForm.controls['email'];
    let password = component.loginForm.controls['password'];
    email.setValue("tester@web.de");
    password.setValue("a123");

    inject([AuthService], (auth) => {
      let user: User;
      expect(auth).toBeDefined();
      auth.register().subscibe((value) => user = value);
      component.login();

      expect(user.email).toBe("tester@web.de");
      expect(user.password).toBe("a123");
    })
  });

  describe('have an INVALID field', () => {

    it('email when empty', () => {
      let email = component.loginForm.controls['email'];
      expect(email.valid).toBeFalsy();
    });

    it('email when wrong formatting', () => {
      let errors = {};
      let email = component.loginForm.controls['email'];
      email.setValue("wrongMail");
      errors = email.errors || {};
      expect(errors['pattern']).toBeTruthy();
    });

  });

  describe('have a VALID field', () => {

    it('email when correct formatting', () => {
      let errors = {};
      let email = component.loginForm.controls['email'];
      email.setValue("email@web.de");
      errors = email.errors || {};
      expect(errors['pattern']).toBeFalsy();
    });

  });
});
