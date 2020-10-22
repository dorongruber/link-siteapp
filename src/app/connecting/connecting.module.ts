import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import { ConnectingRoutingModule } from './connecting-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './forms/registerform/register.component';
import { LogformComponent } from './forms/logform/loginform.component';



@NgModule({
  declarations: [
    LoginComponent,
    LogformComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ConnectingRoutingModule
  ]
})
export class ConnectingModule { }
