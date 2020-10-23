import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './forms/registerform/register.component';
import { LogformComponent } from './forms/logform/loginform.component';

const routes: Routes = [
  { path: '', component: LoginComponent, data: {animation: 'loginBody'},
  children: [
    {path: 'registration', component: RegisterComponent},
    {path: 'login', component: LogformComponent}
  ]
},
  {path: 'connect/login', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectingRoutingModule { }
