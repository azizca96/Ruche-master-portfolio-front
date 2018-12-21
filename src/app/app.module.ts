import { HttpClient } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./landing/landing.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthUserComponent } from "./auth-user/auth-user.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { MatProviderModule } from "./mat-provider/mat-provider.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2CarouselamosModule } from "ng2-carouselamos";
import { OfferItemComponent } from "./offer-item/offer-item.component";
import { OfferDetailsComponent } from "./offer-details/offer-details.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { UserService } from "./providers/user.service";
import { HttpClientModule } from "@angular/common/http";
import { CandiListComponent } from "./candi-list/candi-list.component";
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AuthUserComponent,
    HomeComponent,
    ProfileComponent,
    SettingsComponent,
    OfferItemComponent,
    OfferDetailsComponent,
    EditProfileComponent,
    CandiListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatProviderModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2CarouselamosModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  entryComponents: [
    OfferDetailsComponent,
    EditProfileComponent,
    CandiListComponent
  ]
})
export class AppModule {}
