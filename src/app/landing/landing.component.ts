import { Component, OnInit } from "@angular/core";
import * as p5 from "p5";
@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  animatedText = "Welcome Between us";

  private p5;
  constructor() {}
  ngOnInit(): void {
    setTimeout(() => {
      this.createCanvas();
    }, 5000);
  }
  private createCanvas() {
    this.p5 = new p5(this.sketch);
  }
  private sketch(p: any, context: any) {
    let dots = [];
    //let wi, he;
    let wi = document.getElementById("drawer-1").clientWidth;
    let he = document.getElementById("drawer-1").clientHeight;
    p.setup = () => {
      const l = p.createCanvas(wi, he);
      l.parent("drawer-1");
      for (let i = 0; i < 15; i++) {
        let x = Math.floor(Math.random() * Math.floor(wi / 2));
        let y = Math.floor(Math.random() * Math.floor(he / 2));
        if (x < 50) {
          x += 50;
        }
        if (y < 50) {
          y += 50;
        }
        let pos = { x: x, y: y };
        // random x directon
        const chanceX = Math.floor(Math.random() * Math.floor(100));
        let drx = 1;
        if (chanceX < 50) {
          drx = -1;
        }
        // random y dr
        const chanceY = Math.floor(Math.random() * Math.floor(100));
        let dry = 1;
        if (chanceY < 50) {
          dry = -1;
        }
        dots.push({
          _id: i,
          x: pos.x,
          y: pos.y,
          drx: drx,
          dry: dry
        });
      }
    };

    p.draw = () => {
      p.clear();
      for (let j = 0; j < dots.length; j++) {
        p.ellipse(dots[j].x, dots[j].y, 5, 5);
        p.fill(0);
      }
      for (let j = 0; j < dots.length; j++) {
        let dot = dots[j];
        for (let k = j + 1; k < dots.length; k++) {
          let ds = p.int(p.dist(dot.x, dot.y, dots[k].x, dots[k].y));
          if (ds <= 100) {
            p.line(dot.x, dot.y, dots[k].x, dots[k].y);
          }
        }
        if (dot.x < 2) {
          dot.drx = 1;
        }
        if (dot.y < 2) {
          dot.dry = 1;
        }
        let lmx = wi - 5;
        let lmy = he - 5;

        if (dot.x > lmx) {
          dot.drx = -1;
        }
        if (dot.y > lmy) {
          dot.dry = -1;
        }

        dot.x = dot.x + dot.drx / 2;
        dot.y = dot.y + dot.dry / 2;
      }
    };
  }
  randomPos(h, w) {
    let x = Math.floor(Math.random() * Math.floor(w));
    let y = Math.floor(Math.random() * Math.floor(h));
    if (x < 50) {
      x += 50;
    }
    if (y < 50) {
      y += 50;
    }
    return { x: x, y: y };
  }
}
