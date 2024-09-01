import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../share/material/material.module';
import { AuthComponent } from './auth.component';

const routes: Routes = [{ path: '', component: AuthComponent }];


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthModule { }
