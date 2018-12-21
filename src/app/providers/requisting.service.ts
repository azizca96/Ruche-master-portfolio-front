import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RequistingService {
  private api_url = "http://localhost:3001/request";
  constructor(private _http: HttpClient) {}
  postule(_id_offer, _id_user, user_token) {
    return this._http.post(this.api_url + "/" + _id_offer, {
      user_token: user_token,
      user_id: _id_user
    });
  }
  getbyUser(_id_user) {
    return this._http.get(this.api_url + "/user/" + _id_user);
  }
  getbycompany(_id_user) {
    return this._http.get(this.api_url + "/company/" + _id_user);
  }
}
