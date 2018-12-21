import { Component, OnInit } from "@angular/core";
import * as AOS from "aos";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "ruche";
  calling = "Hello Star";
  btnshow = false;
  ngOnInit() {
    AOS.init();
    let step = 0;
    setInterval(() => {
      switch (step) {
        case 1:
          this.calling = "Hello Star";
          console.log("start hhh");
          break;
        case 2:
          this.calling = "We was waiting for your";
          console.log("start hhh");
          break;
        case 3:
          this.calling = "we are looking for shiny star";
          console.log("start hhh");
          break;
        case 4:
          this.calling = "you are envolved";
          console.log("start hhh");
          break;
        case 5:
          this.calling = "Welcome in";
          console.log("start hhh");
          break;
      }
      step++;
      if (step > 5) {
        this.btnshow = true;
      }
    }, 1000);
  }
}
