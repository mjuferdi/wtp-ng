import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import 'rxjs/Rx';

class DecodedToken {
    exp: number = 0;
    username: string = '';
}

@Injectable()
export class AuthService {
    private decodedToken;

    constructor(private http: HttpClient) {
        this.decodedToken = JSON.parse(localStorage.getItem('wtp_meta')) || new DecodedToken();
    }

    private saveToken(token: string): string {
        this.decodedToken = jwt.decode(token);
        localStorage.setItem('wtp_auth', token);
        localStorage.setItem('wtp_meta', JSON.stringify(this.decodedToken));

        return token;
    }

    private getExpiration() {
        return moment.unix(this.decodedToken.exp);
    }

    public register(userData: any): Observable<any> {
        return this.http.post('api/v1/users/register', userData);
    }

    public login(userData: any): Observable<any> {
        return this.http.post('api/v1/users/auth', userData).map(
            (token: string) => this.saveToken(token));
    }

    public logout() {
        localStorage.removeItem('wtp_auth');
        localStorage.removeItem('wtp_meta');

        this.decodedToken = new DecodedToken();
    }

    public isAuthenticated(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    public getAuthToken(): string {
        return localStorage.getItem('wtp_auth');
    }

    public getUserName(): string {
        return this.decodedToken.username;
    }
}
