import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OfferDetailsComponent } from "../offer-details/offer-details.component";
@Component({
  selector: "app-offer-item",
  templateUrl: "./offer-item.component.html",
  styleUrls: ["./offer-item.component.scss"]
})
export class OfferItemComponent implements OnInit {
  @Input() offer;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(OfferDetailsComponent, {
      width: "90%",
      data: { offer: this.offer }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
