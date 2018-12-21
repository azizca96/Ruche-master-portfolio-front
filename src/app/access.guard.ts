import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AccessGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const v1 = localStorage.getItem("user_local__id");
    const v2 = localStorage.getItem("user_local_token");
    const v3 = localStorage.getItem("user_local_token_time");
    if (v1 && v2 && v3) {
      return false;
    }
    return true;
  }
}
