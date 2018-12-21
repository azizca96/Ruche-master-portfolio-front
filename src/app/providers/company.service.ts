import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CompanyService {
  private api_url = "http://localhost:3001/company";
  constructor(private _http: HttpClient) {}
  getCompanybyId(id) {
    return this._http.get(this.api_url + "/" + id);
  }
}
