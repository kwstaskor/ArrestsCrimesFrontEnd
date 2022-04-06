import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArrestsComponent } from './components/arrests/arrests.component';
import { ErrorComponent } from './components/Shared/error/error.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { VictimsComponent } from './Components/victims/victims.component';



const routes: Routes = [
  {path: "Arrests", component: ArrestsComponent ,canActivate: [AuthGuard]},
  {path: "Victims", component:VictimsComponent ,canActivate: [AuthGuard]},
  {path: "", redirectTo: "Arrests", pathMatch: "full" },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
