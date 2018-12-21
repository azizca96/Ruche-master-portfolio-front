import { Routes, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class UserService {
  private api_url = "http://localhost:3001/user";
  constructor(private _http: HttpClient, private _route: Router) {}
  getUser(user_id) {
    const header = new HttpHeaders({
      id: user_id
    });
    return this._http.get(this.api_url + "/" + user_id, { headers: header });
  }
  updateUser(user_data, user_id) {
    console.log("updating " + user_id);

    return this._http.patch(this.api_url + "/" + user_id, user_data);
  }
  connectUser(authParam) {
    return this._http.post(this.api_url + "/login", authParam);
  }
  disconnectUser() {
    localStorage.clear();
    this._route.navigate(["/home"]);
  }
  createUser(user_data) {
    return this._http.post(this.api_url + "/signup", user_data);
  }
  createSession(user_data, token) {
    localStorage.setItem("user_", JSON.stringify(user_data));
    localStorage.setItem("user_token_", token);
  }
}
