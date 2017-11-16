import { RouterModule, Routes} from "@angular/router";
import { NgModule } from '@angular/core';
import { HomeComponent} from "./component/home/home.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { RegisterComponent } from "./component/register/register.component";
import { LoginComponent } from "./component/login/login.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: []
})
export class AppRoutingModule { }
