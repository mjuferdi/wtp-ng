import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './shared/auth.service';


// Routing for pages
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
]


@NgModule({
  declarations: [
      LoginComponent,
      RegisterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule
    //ReactiveFormsModule,

  ],
  providers: [
      AuthService
  ]
})
export class AuthModule { }
