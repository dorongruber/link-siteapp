import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';



const appRoutes: Routes = [

  {
    path: 'mainpage',
    loadChildren: () => import('./connected/connected.module')
    .then(m => m.ConnectedModule),

  },
  {
    path: 'connect',
    loadChildren: () => import('./connecting/connecting.module')
    .then(m => m.ConnectingModule)


  },
  {path: '', redirectTo: '/connect', pathMatch: 'full' }

  // { path: 'connecting', loadChildren: () => import('./connecting/connecting.module').then(m => m.ConnectingModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
      {
        enableTracing: false,
      })
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
