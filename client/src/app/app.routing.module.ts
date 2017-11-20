import { RouterModule, Routes} from "@angular/router";
import { NgModule } from '@angular/core';
import { HomeComponent} from "./component/home/home.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { RegisterComponent } from "./component/register/register.component";
import { LoginComponent } from "./component/login/login.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/not.auth.guard";
import { BlogComponent } from "./component/blog/blog.component";
import { EditBlogComponent } from "./component/blog/edit-blog/edit-blog.component";
import { DeleteBlogComponent } from "./component/blog/delete-blog/delete-blog.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit-blog/:id', component: EditBlogComponent, canActivate: [AuthGuard]},
  { path: 'delete-blog/:id', component: DeleteBlogComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: []
})
export class AppRoutingModule { }
