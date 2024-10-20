import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DetailPartComponent } from './detail-part.component';
import { MaterialModule } from '../../share/material/material.module';

const routes: Routes = [{ path: '', component: DetailPartComponent }];

@NgModule({
  declarations: [DetailPartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [DetailPartComponent]
})
export class DetailPartModule { }