import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, MatTabsModule],
  exports: [CommonModule, RouterModule, HeaderComponent, MatTabsModule],
})
export class SharedModule {}
