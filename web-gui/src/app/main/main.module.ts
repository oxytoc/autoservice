import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../share/material/material.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
