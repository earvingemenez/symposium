import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';



@NgModule({
  declarations: [LoginComponent, PagenotfoundComponent],
  imports: [
    CommonModule
  ]
})
export class PublicModule { }
