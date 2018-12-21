import { Router } from "@angular/router";
import { UserService } from "./../providers/user.service";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
@Component({
  selector: "app-auth-user",
  templateUrl: "./auth-user.component.html",
  styleUrls: ["./auth-user.component.scss"]
})
export class AuthUserComponent implements OnInit {
  prosOn = false;
  userType = "us";
  logindata = {
    email: "",
    password: ""
  };
  regForm = new FormGroup({
    user_type: new FormControl(this.userType, [Validators.required]),
    name: new FormControl("", [Validators.required]),
    last_name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]),
    password_c: new FormControl("", [Validators.required]),
    c_name: new FormControl(""),
    c_email: new FormControl(""),
    c_password: new FormControl(""),
    c_password_c: new FormControl("")
  });
  showPhase = {
    signin: true,
    signup: false
  };

  constructor(
    private _uService: UserService,
    public snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit() {}
  register() {
    console.log(this.regForm.value);
    this._uService
      .createUser({
        email: this.regForm.value.email,
        password: this.regForm.value.password,
        first_name: this.regForm.value.name,
        last_name: this.regForm.value.last_name
      })
      .subscribe(
        res => {
          console.log(res);
          if (res["stat"]) {
            if (res["message"] === "user_created") {
              // user created
              this.snackBar.open("SUCCESSFULY created , login now", "Thanks", {
                duration: 2000
              });
            } else if (res["message"] === "mail_exists") {
              this.snackBar.open("the email already exists", "close", {
                duration: 2000
              });
            } else {
              this.snackBar.open(
                "it look that we have troubles, try later",
                "okay",
                {
                  duration: 2000
                }
              );
            }
          } else {
            this.snackBar.open(
              "it look that we have troubles, try later",
              "close",
              {
                duration: 2000
              }
            );
          }
        },
        err => {
          console.log(err);
          this.snackBar.open(
            "Internet not available , or servers down !!",
            "close",
            {
              duration: 2000
            }
          );
        }
      );
  }
  login() {
    if (this.logindata.email.length > 3 && this.logindata.password.length > 4) {
      this._uService.connectUser(this.logindata).subscribe(
        data => {
          console.log(data);

          if (data["stat"] === true) {
            this.snackBar.open(
              "Welcome Back , redirect within 3 secondes",
              "okay",
              { duration: 3000 }
            );
            localStorage.setItem("user_local_token", data["token"]);
            localStorage.setItem(
              "user_local_token_time",
              JSON.stringify(new Date())
            );
            localStorage.setItem("user_local__id", data["_id"]);
            setTimeout(() => {
              this._router.navigate(["/profile/" + data["_id"]]);
            }, 3500);
          } else {
            if (data["stat"] === false) {
              this.snackBar.open("Email or password are wrong", "NICE", {
                announcementMessage: "d",
                duration: 5000
              });
            } else {
              this.snackBar.open(
                "we have some troubles in our backend , try later",
                "okay"
              );
            }
          }
        },
        err => {
          this.snackBar.open("please check you internet acccess", "okay");
        }
      );
    } else {
      this.snackBar.open("Provide correct data");
    }
  }
}
