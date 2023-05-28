import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserWithRedirectGuard {
  public constructor(private authService: AuthService, private router: Router) {}

  public canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    return this.authService.userIsLogged.pipe(
      map((value) => (value ? true : this.router.parseUrl('/'))),
    );
  }
}
