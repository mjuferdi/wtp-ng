import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';


@Injectable()
export class RentalService {

  private rentals: Rental[] = [{
    id: "1",
    title: "Central Apartment 1",
    city: "Berlin",
    street: "Rathenau str",
    category: "Apartment",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    description: "Big, ruhig und sauber apartment",
    dailyRate: 18,
    shared: false,
    createdAt: "28/10/2017"
  },
  {
    id: "2",
    title: "Central Apartment 2",
    city: "Amsterdam",
    street: "Haarlemmerstraat 64",
    category: "Condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 5,
    description: "Sauber apartment",
    dailyRate: 356,
    shared: true,
    createdAt: "28/10/2017"
  },
  {
    id: "3",
    title: "Central Apartment 3",
    city: "Bratislava",
    street: "Hlavna 33",
    category: "Condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 1,
    description: "Sauber apartment",
    dailyRate: 24,
    shared: true,
    createdAt: "28/10/2017"
  },
  {
    id: "4",
    title: "Central Apartment 4",
    city: "Amsterdam",
    street: "Waterlooplein 345",
    category: "House",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    description: "Sauber apartment",
    dailyRate: 243,
    shared: false,
    createdAt: "28/10/2017"
  }];

  public getRentalById(rentalId: string): Observable<Rental> {
    return new Observable<Rental>((observer) => {
      setTimeout(() => {
        const foundRental = this.rentals.find((rental) => {
          return rental.id == rentalId;
        });
        observer.next(foundRental);
      }, 500);
    });
  }

  public getRentals(): Observable<Rental[]> {
    return new Observable<Rental[]>((observer) => {
      setTimeout(() => {
        observer.next(this.rentals);
      }, 1000);
    });
  }

}
