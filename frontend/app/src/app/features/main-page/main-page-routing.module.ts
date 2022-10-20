import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [{ path: 'list', component: ListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
