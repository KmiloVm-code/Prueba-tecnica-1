import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegisterRoutingModule } from './register-routing-module';
import { Register } from './register';


@NgModule({
  declarations: [
    Register
  ],
  imports: [
    CommonModule,
    FormsModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
