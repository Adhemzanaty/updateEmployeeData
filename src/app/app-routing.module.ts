import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pathGuard } from './path.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HomeEnComponent } from './home-en/home-en.component';
import { NephraFormComponent } from './nephra-form/nephra-form.component';


const routes: Routes = [
  {path: '' , redirectTo: '/NephraForm' , pathMatch: 'full'},
  {path: 'home' , component: HomeComponent},
  {path: 'homeEn' , component: HomeEnComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'NephraForm' , component: NephraFormComponent,title: 'NephraRisk - Assessment Tool'},

  {path: '**', redirectTo: '/login' }




];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true , scrollPositionRestoration: 'top' , anchorScrolling: 'enabled'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
