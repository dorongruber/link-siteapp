import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';

const connectedRoutes: Routes = [
  {path: '', component: MainpageComponent, data: {animation: 'mainPage'},
  children: [
    {path: 'private/:id', component: TableComponent},
    {path: 'search/:id', component: SearchComponent}

  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(connectedRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConnectedRoutingModule {}
