import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class SharedModule {}
