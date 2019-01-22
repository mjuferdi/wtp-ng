import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'wtp-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {
  newRental: Rental;
  rentalCategories = Rental.CATEGORIES;
  errors: any = [];

  constructor(private rentalService: RentalService, private router: Router) { }

  handleImageChange() {
      this.newRental.image = "https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
  }

  ngOnInit() {
    this.newRental = new Rental;
    this.newRental.shared = false;
  }

  createRental() {
      this.rentalService.createRental(this.newRental).subscribe(
          (rental: Rental) => {
              this.router.navigate([`/rentals/${rental._id}`]);
          },
          (errorResponse: HttpErrorResponse) => {
              this.errors = errorResponse.error.errors;
          })
  }
}
