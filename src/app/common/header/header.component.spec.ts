import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header.component';

import { AuthModule } from '../../auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';


describe('HeaderComponent', () => {
  const routes: Routes = [
    { path: 'login', redirectTo: '/login', pathMatch: 'full'},
    { path: 'register', redirectTo: '/register', pathMatch: 'full' }
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        RouterModule.forRoot(routes),
        HttpClientModule,
        BrowserModule,
        AuthModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        ToastModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  it('should create the header', async(() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
