import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';

import { RentalSearchComponent, RentalComponent, RentalListItemComponent, RentalListComponent, RentalDetailComponent, RentalDetailBookingComponent } from './';

import { RentalService } from './shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { HelperService } from '../common/service/helper.service';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';

import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { SearchRentalPipe } from '../common/pipes/search.pipe';

// Routing for pages
const routes: Routes = [
  { path: 'rentals',
    component: RentalComponent,
    children: [
    	{ path: '', component: RentalListComponent },
      { path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard] },
    	{ path: ':rentalId', component: RentalDetailComponent},
      { path: ':city/homes', component: RentalSearchComponent}
    ]
  }
]

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent,
    UppercasePipe,
    RentalDetailBookingComponent,
    RentalSearchComponent,
    RentalCreateComponent,
    SearchRentalPipe
  ],
  imports: [
  	CommonModule,
  	RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule
  ],
  providers: [
    RentalService,
    HelperService,
    BookingService
  ]
})
export class RentalModule {}
