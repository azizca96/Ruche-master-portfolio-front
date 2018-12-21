import { OfferService } from "./../providers/offer.service";
import { Component, OnInit, Inject } from "@angular/core";
import { RequistingService } from "../providers/requisting.service";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";

@Component({
  templateUrl: "./candi-list.component.html",
  styleUrls: ["./candi-list.component.scss"]
})
export class CandiListComponent implements OnInit {
  list: Array<any> = [];
  constructor(
    private _reqService: RequistingService,
    private _offerService: OfferService,
    public dialogRef: MatDialogRef<CandiListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _snckBacr: MatSnackBar
  ) {
    this._reqService.getbyUser(data.id).subscribe(
      datai => {
        if (datai["stat"] && datai["reqs"]) {
          this.list = datai["reqs"];
          for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index].offer_id;
            this._offerService.getOffer(element).subscribe(
              datao => {
                if (datao["_id"]) {
                  this.list[index].offerdata = datao;
                }
              },
              err => {
                this._snckBacr.open("Internet problem", "close");
                this.dialogRef.close();
              }
            );
          }
        }
      },
      err => {
        this._snckBacr.open("Internet problem", "close");
        this.dialogRef.close();
      }
    );
  }

  ngOnInit() {}
}
