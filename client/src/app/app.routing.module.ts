import { RouterModule, Routes} from "@angular/router";
import { NgModule } from '@angular/core';
import { HomeComponent} from "./component/home/home.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { RegisterComponent } from "./component/register/register.component";
import { LoginComponent } from "./component/login/login.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/not.auth.guard";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: []
})
export class AppRoutingModule { }
