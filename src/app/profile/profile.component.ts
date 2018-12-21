import { CandiListComponent } from "./../candi-list/candi-list.component";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "./../providers/user.service";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Component, OnInit } from "@angular/core";
import { ThrowStmt } from "@angular/compiler";
import { EditProfileComponent } from "../edit-profile/edit-profile.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  isOwner: Boolean = false;
  showDeep = false;
  gohide = false;
  selectedIndex;
  user = {
    first_name: "",
    last_name: "",
    title: "",
    birthday: "",
    phone_number: "",
    location: "",
    email: "",
    about: "",
    looking_for: "",
    skills: [
      { name: "Angular 5", value: 90 },
      { name: "Electronjs", value: 90 },
      { name: "Java", value: 90 },
      { name: "jEE", value: 70 },
      { name: "Android", value: 80 },
      { name: "C / C++", value: 90 },
      { name: ".NET", value: 80 },
      { name: "Symfony", value: 80 },
      { name: "Ionic", value: 100 },
      { name: "Perl", value: 30 }
    ],
    experience: [
      {
        company_name: "mkd-company",
        job: "mobile developer",
        start_date: new Date(),
        end_date: new Date(),
        dscrp:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit.\
          Maxime repellendus ullam expedita ducimus minima officiis voluptates incidunt quam sed aspernatur,\
          inventore ab dolor maiores porro natus ? Voluptate nam aspernatur illo?"
      },
      {
        company_name: "mkd-company",
        job: "mobile developer",
        start_date: new Date(),
        end_date: null,
        dscrp:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit.\
          Maxime repellendus ullam expedita ducimus minima officiis voluptates incidunt quam sed aspernatur,\
          inventore ab dolor maiores porro natus ? Voluptate nam aspernatur illo?"
      },
      {
        company_name: "mkd-company",
        job: "mobile developer",
        start_date: new Date(),
        end_date: new Date(),
        dscrp:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit.\
          Maxime repellendus ullam expedita ducimus minima officiis voluptates incidunt quam sed aspernatur,\
          inventore ab dolor maiores porro natus ? Voluptate nam aspernatur illo?"
      },
      {
        company_name: "mkd-company",
        job: "mobile developer",
        start_date: new Date(),
        end_date: new Date(),
        dscrp:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit.\
          Maxime repellendus ullam expedita ducimus minima officiis voluptates incidunt quam sed aspernatur,\
          inventore ab dolor maiores porro natus ? Voluptate nam aspernatur illo?"
      }
    ],
    projects: [
      {
        title: "Play-on Desktop APP",
        dscrp:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam\
            cumque veritatis fuga iure et ex provident, quos ducimus quam ipsam?\
            Consectetur",
        date: new Date(),
        link: "https://google.com",
        images: [
          "https://placeimg.com/640/480/tech",
          "https://placeimg.com/500/500/tech",
          "https://placeimg.com/640/980/tech"
        ]
      }
    ],
    education: [
      {
        degree: "Bac Informatique",
        start_date: new Date(),
        end_date: new Date(),
        dscrp: "",
        instut: "Khaznadar Secondery School"
      },
      {
        degree: "Licence fondamentale Science de l'informatique",
        start_date: new Date(),
        end_date: new Date(),
        dscrp:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam\
            cumque veritatis fuga iure et ex provident, quos ducimus quam ipsam?\
            Consectetur",
        instut: "FST , el Manar"
      },
      {
        degree: "Computer Science Engineering",
        start_date: new Date(),
        end_date: new Date(),
        dscrp:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam\
            cumque veritatis fuga iure et ex provident, quos ducimus quam ipsam?\
            Consectetur",
        instut: "ULT"
      }
    ]
  };
  openId = "";
  constructor(
    private _matmodal: MatDialog,
    private _userService: UserService,
    private _snckBar: MatSnackBar,
    private _router: ActivatedRoute
  ) {
    this.loadProfile();
  }

  ngOnInit() {
    const v1 = localStorage.getItem("user_local__id");
    const v2 = localStorage.getItem("user_local_token");
    const v3 = localStorage.getItem("user_local_token_time");
    if (v1 && v2 && v3 && this.openId === v1) {
      this.user["token"] = v2;
      this.user["_id"] = v1;
      this.isOwner = true;
    }
  }
  getDeep() {
    this.showDeep = true;
    setTimeout(() => {
      this.gohide = !this.gohide;
    }, 1000);
  }
  openEdit() {
    const dialogRef = this._matmodal.open(EditProfileComponent, {
      width: "90%",
      data: { user: this.user, id: this.openId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
  openCandi() {
    const dialogRef = this._matmodal.open(CandiListComponent, {
      width: "90%",
      data: { id: this.openId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
  loadProfile() {
    this._router.params.subscribe(para => {
      const target_profile = para["id"];
      this.openId = para["id"];
      this._userService.getUser(target_profile).subscribe(
        data => {
          if (data["stat"]) {
            console.log(data);
            const user = data["user_found"];
            this.user = user;
          }
        },
        error => {
          this._snckBar.open("we cannot load");
        }
      );
    });
  }
  updateProfile() {}
}
