import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule} from "./app.routing.module";
import { AppComponent } from './app.component';
import { ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
// Component
import { NavbarComponent} from "./component/navbar/navbar.component";
import { RouterModule, Routes } from "@angular/router";
import { FooterComponent} from "./component/footer/footer.component";
import { HomeComponent} from "./component/home/home.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { RegisterComponent } from "./component/register/register.component";
import { LoginComponent} from "./component/login/login.component";
import { ProfileComponent } from "./component/profile/profile.component";
// Service
import { AuthService } from "./service/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
