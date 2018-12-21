import { UserService } from "./../providers/user.service";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from "@angular/core";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar
} from "@angular/material";
import { Observable, iif } from "rxjs";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ActivatedRoute } from "@angular/router";
@Component({
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
  user = {
    first_name: "",
    last_name: "",
    phone_number: "",
    birthday: "",
    about: "",
    cv_link: "",
    experience: [],
    location: "",
    projects: [],
    email: "",
    skills: [],
    title: "",
    looking_for: "",
    education: []
  };
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  allSkills: string[] = ["Angular", "React", "JavaScript ", "NodeJS", "Vuejs"];
  currentUser_id = "";
  @ViewChild("skillInput") skillInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  constructor(
    private _userService: UserService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _snckBacr: MatSnackBar,
    private _route: ActivatedRoute
  ) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) =>
        skill ? this._filter(skill) : this.allSkills.slice()
      )
    );
    this.user = this.data.user;
    this.currentUser_id = this.data.id;
    // this._route.params.subscribe(p => {
    //   this.currentUser_id = p["id"];
    // });
  }

  ngOnInit() {}
  save(form, type?) {
    console.log(form);
    if (!type) {
      console.log("saving personal form");

      this._userService.updateUser(this.user, this.currentUser_id).subscribe(
        data => {
          if (data["message"] && data["message"] === "update_success") {
            this._snckBacr.open(
              "Personal informartion have been updated :) ",
              "Close"
            );
          } else {
            this._snckBacr.open(
              "It look like we cant do it now , try later",
              "okay"
            );
          }
        },
        err => {
          this._snckBacr.open(
            "the intern off , or the server down ",
            "Evil me"
          );
        }
      );
    } else {
      // experience
      if (type === "experience") {
        if (this.user.experience) {
          this.user.experience.push(form.value);
        } else {
          this.user.experience = [];
          this.user.experience.push(form.value);
        }

        this._userService.updateUser(this.user, this.currentUser_id).subscribe(
          data => {
            if (data["message"] && data["message"] === "update_success") {
              this._snckBacr.open("Experence have been updated :) ", "Close");
            } else {
              this._snckBacr.open(
                "It look like we cant do it now , try later",
                "okay"
              );
            }
          },
          err => {
            this._snckBacr.open(
              "the internet off , or the server down ",
              "Evil me"
            );
          }
        );
      } else if (type === "project") {
        if (this.user.projects) {
          this.user.projects.push(form.value);
        } else {
          this.user.projects = [];
          this.user.projects.push(form.value);
        }

        this._userService.updateUser(this.user, this.currentUser_id).subscribe(
          data => {
            if (data["message"] && data["message"] === "update_success") {
              this._snckBacr.open("Project have been updated :) ", "Close");
            } else {
              this._snckBacr.open(
                "It look like we cant do it now , try later",
                "okay"
              );
            }
          },
          err => {
            this._snckBacr.open(
              "the internet off , or the server down ",
              "Evil me"
            );
          }
        );
      } else if (type === "skill") {
        this._userService.updateUser(this.user, this.currentUser_id).subscribe(
          data => {
            if (data["message"] && data["message"] === "update_success") {
              this._snckBacr.open("Skills have been saved :) ", "Close");
            } else {
              this._snckBacr.open(
                "It look like we cant do it now , try later",
                "okay"
              );
            }
          },
          err => {
            this._snckBacr.open(
              "the internet off , or the server down ",
              "Evil me"
            );
          }
        );
      } else if (type === "education") {
        if (this.user.education) {
          this.user.education.push(form.value);
        } else {
          this.user.education = [];
          this.user.education.push(form.value);
        }
        this._userService.updateUser(this.user, this.currentUser_id).subscribe(
          data => {
            if (data["message"] && data["message"] === "update_success") {
              this._snckBacr.open("Education have been updated :) ", "Close");
            } else {
              this._snckBacr.open(
                "It look like we cant do it now , try later",
                "okay"
              );
            }
          },
          err => {
            this._snckBacr.open(
              "the internet off , or the server down ",
              "Evil me"
            );
          }
        );
      }
    }
  }
  deleteExp(_id) {
    for (let index = 0; index < this.user.experience.length; index++) {
      const element = this.user.experience[index];
      if (element._id === _id) {
        this.user.experience.splice(index, 1);
        this._userService.updateUser(this.user, this.currentUser_id).subscribe(
          data => {
            if (data["message"] && data["message"] === "update_success") {
              this._snckBacr.open("Experence have been Deleted :) ", "Close");
            } else {
              this._snckBacr.open(
                "It look like we cant do it now , try later",
                "okay"
              );
            }
          },
          err => {
            this._snckBacr.open(
              "the internet off , or the server down ",
              "Evil me"
            );
          }
        );
      }
    }
  }
  deleteEdc(_id) {
    for (let index = 0; index < this.user.education.length; index++) {
      const element = this.user.education[index];
      if (element._id === _id) {
        this.user.education.splice(index, 1);
        this._userService.updateUser(this.user, this.currentUser_id).subscribe(
          data => {
            if (data["message"] && data["message"] === "update_success") {
              this._snckBacr.open("Education have been Deleted :) ", "Close");
            } else {
              this._snckBacr.open(
                "It look like we cant do it now , try later",
                "okay"
              );
            }
          },
          err => {
            this._snckBacr.open(
              "the internet off , or the server down ",
              "Evil me"
            );
          }
        );
      }
    }
  }
  deletePrj(_id) {
    for (let index = 0; index < this.user.projects.length; index++) {
      const element = this.user.projects[index];
      if (element._id === _id) {
        this.user.projects.splice(index, 1);
        this._userService.updateUser(this.user, this.currentUser_id).subscribe(
          data => {
            if (data["message"] && data["message"] === "update_success") {
              this._snckBacr.open("Project have been Deleted :) ", "Close");
            } else {
              this._snckBacr.open(
                "It look like we cant do it now , try later",
                "okay"
              );
            }
          },
          err => {
            this._snckBacr.open(
              "the internet off , or the server down ",
              "Evil me"
            );
          }
        );
      }
    }
  }
  deleteSkill(_id) {
    for (let index = 0; index < this.user.skills.length; index++) {
      const element = this.user.skills[index];
      if (element._id === _id) {
        this.user.skills.splice(index, 1);
        this._userService.updateUser(this.user, this.currentUser_id).subscribe(
          data => {
            if (data["message"] && data["message"] === "update_success") {
              this._snckBacr.open("Skill have been Deleted :) ", "Close");
            } else {
              this._snckBacr.open(
                "It look like we cant do it now , try later",
                "okay"
              );
            }
          },
          err => {
            this._snckBacr.open(
              "the internet off , or the server down ",
              "Evil me"
            );
          }
        );
      }
    }
  }
  add(event: MatChipInputEvent): void {
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our skill
      if ((value || "").trim()) {
        if (this.user.skills) {
          this.user.skills.push({ name: value.trim(), value: 50 });
        } else {
          this.user.skills = [];
          this.user.skills.push({ name: value.trim(), value: 50 });
        }
      }

      // Reset the input value
      if (input) {
        input.value = "";
      }

      this.skillCtrl.setValue(null);
    }
  }

  remove(skill: string): void {
    const index = this.user.skills.indexOf(skill);

    if (index >= 0) {
      this.user.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.user.skills) {
      this.user.skills = [];
    }
    this.user.skills.push({ name: event.option.viewValue, value: 50 });
    this.skillInput.nativeElement.value = "";
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(
      skill => skill.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
