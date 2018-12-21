import { RequistingService } from "./../providers/requisting.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
@Component({
  templateUrl: "./offer-details.component.html",
  styleUrls: ["./offer-details.component.scss"]
})
export class OfferDetailsComponent implements OnInit {
  offer;
  isConnected = false;
  user = {};
  constructor(
    private _reqService: RequistingService,
    private _snckBar: MatSnackBar,
    public dialogRef: MatDialogRef<OfferDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.offer = this.data.offer;
    const v1 = localStorage.getItem("user_local__id");
    const v2 = localStorage.getItem("user_local_token");
    const v3 = localStorage.getItem("user_local_token_time");
    if (v1 && v2 && v3) {
      this.user["token"] = v2;
      this.user["_id"] = v1;
      this.isConnected = true;
    }
  }

  ngOnInit() {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  postule() {
    this._reqService
      .postule(this.offer._id, this.user["_id"], this.user["token"])
      .subscribe(
        data => {
          if (data["message"] === "offer_postule_successfully") {
            this._snckBar.open("Done , we will get in touche soon", "Jaw");
          } else {
            this._snckBar.open(
              "it look we have problem to do that easy task ",
              "damn"
            );
          }
        },
        err => {
          this._snckBar.open(
            "Servers down ; Or you have oldy internet",
            "damn"
          );
        }
      );
  }
}
