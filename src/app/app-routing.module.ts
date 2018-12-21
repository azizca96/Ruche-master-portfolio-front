import { AccessGuard } from "./access.guard";
import { HomeComponent } from "./home/home.component";
import { AuthUserComponent } from "./auth-user/auth-user.component";
import { LandingComponent } from "./landing/landing.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  { path: "", component: LandingComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "auth", component: AuthUserComponent, canActivate: [AccessGuard] },
  { path: "profile/:id", component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
