import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [MainPageComponent, ListComponent, AddComponent],
  imports: [CommonModule, MainPageRoutingModule, SharedModule],
})
export class MainPageModule {}
