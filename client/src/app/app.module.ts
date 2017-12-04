import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule} from "./app.routing.module";
import { AppComponent } from './app.component';
import { ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Component
import { NavbarComponent} from "./component/navbar/navbar.component";
import { RouterModule, Routes } from "@angular/router";
import { FooterComponent} from "./component/footer/footer.component";
import { HomeComponent} from "./component/home/home.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { RegisterComponent } from "./component/register/register.component";
import { LoginComponent} from "./component/login/login.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { FlashMessagesModule } from "angular2-flash-messages";
import { BlogComponent } from "./component/blog/blog.component";
import { BlogItemComponent } from "./component/blog/blog-item/blog-item.component";
import { EditBlogComponent } from "./component/blog/edit-blog/edit-blog.component";
import { DeleteBlogComponent } from "./component/blog/delete-blog/delete-blog.component";
import { ConnectMeComponent } from "./component/connect-me/connect-me.component";
import { ContactInfoComponent } from "./component/connect-me/contact-info/contact-info.component";
import { ReportBugsComponent } from "./component/connect-me/report-bugs/report-bugs.component";
import { ContributeComponent } from "./component/connect-me/contribute/contribute.component";
import { PublicProfileComponent } from "./component/public-profile/public-profile.component";
// Service
import { AuthService } from "./service/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/not.auth.guard";
import { BlogService } from "./service/blog.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    ProfileComponent,
    BlogComponent,
    BlogItemComponent,
    EditBlogComponent,
    DeleteBlogComponent,
    ConnectMeComponent,
    ContactInfoComponent,
    ReportBugsComponent,
    ContributeComponent,
    PublicProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotAuthGuard,
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
