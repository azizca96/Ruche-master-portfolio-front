import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class OfferService {
  private api_url = "http://localhost:3001/offer";
  constructor(private _http: HttpClient) {}
  getOffers() {
    return this._http.get(this.api_url);
  }
  getOffer(offer_id) {
    const header = new HttpHeaders({
      id: offer_id
    });
    return this._http.get(this.api_url + "/" + offer_id, { headers: header });
  }
  postulOffer(user, offer) {
    return this._http.post(this.api_url, { user: user, offer: offer });
  }
  cancelOffer(authParam) {
    return this._http.delete(this.api_url, {
      headers: new HttpHeaders({ authParam })
    });
  }
}
