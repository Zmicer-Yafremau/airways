import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ToastService } from 'angular-toastify';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard {
  public constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
  ) {}

  public canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    return this.authService.userIsLogged.pipe(
      map((value) => {
        if (value) {
          return true;
        }

        this.toast.error('Please sign in');
        return this.router.parseUrl('/');
      }),
    );
  }
}
