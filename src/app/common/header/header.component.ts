import { Component } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { Router } from '@angular/router';


import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: "wtp-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

export class HeaderComponent {

  searchText: string;

  constructor(public auth: AuthService, public router: Router) {}

    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }

    search(city: string) {
        city ? this.router.navigate([`/rentals/${city}/homes`]) : this.router.navigate(['/rentals']);
    }

    searchForm = new FormGroup({
        search: new FormControl('')
    });
}
