import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatListModule, MatSelectModule, MatProgressSpinnerModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
  exports: [
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ]
})
export class MaterialModule { }
