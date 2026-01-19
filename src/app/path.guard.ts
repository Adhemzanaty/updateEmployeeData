import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class pathGuard implements CanActivate {
  constructor(private _APIService: APIService, private router: Router) {}
  canActivate(): boolean {
    if (this._APIService.checkLogin.getValue()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}