import { Pipe, PipeTransform } from '@angular/core';
import { Rental } from '../../rental/shared/rental.model';

@Pipe({
  name: 'searchRental'
})
export class SearchRentalPipe implements PipeTransform {

  transform(rentals: Rental[], searchText: string) : any[] {
    if (!searchText) return rentals;

    console.log(searchText);

    return rentals.filter(str => {
      return str.city.toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
