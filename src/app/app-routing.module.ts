import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pathGuard } from './path.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HomeEnComponent } from './home-en/home-en.component';


const routes: Routes = [
  {path: '' , redirectTo: '/login' , pathMatch: 'full'},
  {path: 'home' , component: HomeComponent},
  {path: 'homeEn' , component: HomeEnComponent},
  {path: 'login' , component: LoginComponent},
  {path: '**', redirectTo: '/login' }




];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true , scrollPositionRestoration: 'top' , anchorScrolling: 'enabled'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
