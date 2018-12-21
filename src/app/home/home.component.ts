import { RequistingService } from "./../providers/requisting.service";
import { CompanyService } from "./../providers/company.service";
import { OfferService } from "./../providers/offer.service";
import { Component, OnInit, HostListener } from "@angular/core";
import { MatSidenav, MatSnackBar } from "@angular/material";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  isConnected = false;
  user = {};
  events: string[] = [];
  opened = true;
  sideType = "side";
  isScreenBig = false;
  isScreenMed = true;
  isScreenSmall = false;
  readytoSHOW = false;
  search = {
    wrd: "",
    offerTypes: [],
    skills: [],
    exp: 0
  };
  offerTypes = [
    { type: "Summer internship", stat: true },
    { type: "Final Study internship", stat: false },
    { type: "Full-time job", stat: false },
    { type: "Freelancer", stat: false },
    { type: "Part-time Job", stat: false }
  ];
  skillsList: string[] = [
    "AngularJS",
    "Angular 2-7",
    "Electron.js",
    "Ionic",
    "Node JS",
    "PHP",
    "Symfony",
    ".NET core",
    "JAVA",
    "jEE",
    "IA",
    "python"
  ];
  offers: Array<any> = [
    {
      id: 1,
      title: "Mobile Developer",
      img: "https://placeimg.com/640/480/tech",
      company: "ZteCHout",
      date: "17/08/2018",
      salaire: ["900", "3000"],
      location: "Tunis,Tunisia",
      requirments: ["Angular5", "NodeJS", "Express", "PHP", "Red Node"],
      description: "lorem"
    }
    // {
    //   id: 1,
    //   title: "Full Stack Developer",
    //   img: "https://placeimg.com/640/640/tech",
    //   company: "tech Land",
    //   date: "17/08/2018",
    //   salaire: ["900", "3000"],
    //   location: "Tunis,Tunisia",
    //   requirments: ["Angular5", "NodeJS", "Express", "PHP", "Red Node"],
    //   description: "lorem"
    // },
    // {
    //   id: 1,
    //   title: "Data Anlayst",
    //   img: "https://placeimg.com/500/500/tech",
    //   company: "InsightData",
    //   date: "17/08/2018",
    //   salaire: ["900", "3000"],
    //   location: "Tunis,Tunisia",
    //   requirments: ["Angular5", "NodeJS", "Express", "PHP", "Red Node"],
    //   description: "lorem"
    // },
    // {
    //   id: 1,
    //   title: "Mobile Developer",
    //   img: "https://placeimg.com/900/900/tech",
    //   company: "CLouderSky",
    //   date: "17/08/2018",
    //   salaire: ["900", "3000"],
    //   location: "Tunis,Tunisia",
    //   requirments: ["Angular5", "NodeJS", "Express", "PHP", "Red Node"],
    //   description: "lorem"
    // }
  ];
  mOffers: Array<any> = [];
  bck;
  filterOn = false;
  constructor(
    private _offerService: OfferService,
    private _companyService: CompanyService,
    private _snckBar: MatSnackBar,
    private _reqService: RequistingService
  ) {
    // user
    const v1 = localStorage.getItem("user_local__id");
    const v2 = localStorage.getItem("user_local_token");
    const v3 = localStorage.getItem("user_local_token_time");
    if (v1 && v2 && v3) {
      this.user["token"] = v2;
      this.user["_id"] = v1;
      this.isConnected = true;
    }
    // content
    // check this offer with connected user
    if (this.isConnected) {
      this._reqService.getbyUser(this.user["_id"]).subscribe(
        data => {
          if (data["stat"]) {
            this.mOffers = data["reqs"];
            console.log(this.mOffers);
          } else {
            this._snckBar.open("Cannot Reach our servers", "try later");
          }
        },
        err => {
          this._snckBar.open("Cannot Reach our servers", "try later");
        }
      );
    }
    this._offerService.getOffers().subscribe(
      data => {
        if (data["message"] && data["message"] === "get_request_successful") {
          this.offers = data["offers_list"];
          //
          // clean
          // for (var i = this.mOffers.length - 1;; i >= 0; i--)
          //   valuesArr.splice(removeValFromIndex[i], 1);
          let remover = [];

          for (let index = 0; index < this.mOffers.length; index++) {
            const elementi = this.mOffers[index].offer_id;
            for (let index0 = 0; index0 < this.offers.length; index0++) {
              const element = this.offers[index0]._id;
              console.log("-> " + element + " -> " + elementi);

              if (element === elementi) {
                remover.push(index0);
              }
            }
          }
          console.log("delete");
          console.log(remover);

          for (var i = remover.length - 1; i >= 0; i--) {
            this.offers.splice(remover[i], 1);
          }
          // wraping
          for (let index = 0; index < this.offers.length; index++) {
            const element = this.offers[index];
            this._companyService.getCompanybyId(element.company).subscribe(
              data2 => {
                if (data2["name"]) {
                  this.offers[index].company = data2["name"];
                  this.offers[index].about = data2["about"];
                }
              },
              err => {
                this._snckBar.open(
                  "look like we have troubles , Landing our home now",
                  "lead me"
                );
              }
            );
          }
        } else {
          this._snckBar.open(
            "look like we have troubles , Landing our home now",
            "lead me"
          );
        }
      },
      err => {
        this._snckBar.open("Cannot Reach our servers", "try later");
      }
    );
  }

  ngOnInit() {
    this.layoutFixer();
    setTimeout(() => {
      this.readytoSHOW = true;
    }, 1000);
    console.log(this.search);
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.layoutFixer();
  }
  layoutFixer() {
    if (window.innerWidth < 500) {
      this.opened = false;
      this.isScreenSmall = true;
      this.isScreenBig = false;
      this.isScreenMed = false;
      this.sideType = "over";
    } else {
      this.opened = true;
      this.sideType = "side";
      if (window.innerWidth < 900) {
        this.isScreenSmall = false;
        this.isScreenBig = false;
        this.isScreenMed = true;
      } else {
        this.isScreenSmall = false;
        this.isScreenBig = true;
        this.isScreenMed = false;
      }
    }
  }
  searchDo() {
    console.log(this.search);
    if (
      this.search.wrd.length > 0 ||
      this.search.exp > 0 ||
      this.search.skills.length > 0 ||
      this.search.offerTypes.length > 0
    ) {
      this.bck = this.offers.filter(item =>
        item.title.includes(this.search.wrd)
      );
      this.filterOn = true;
    } else {
      this.filterOn = false;
    }
  }
}
