import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pathGuard } from './path.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '' , redirectTo: '/home' , pathMatch: 'full'},
  {path: 'home' , component: HomeComponent},
  {path: '**', redirectTo: '/home' }




];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true , scrollPositionRestoration: 'top' , anchorScrolling: 'enabled'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
