import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashBoardComponent} from "./dashboard/dash-board.component";
import {TableComponent} from "./table/table.component";
import {LoginComponent} from "./login/login.component";
import {LayoutComponent} from "../shared/layout/layout.component";
import {ChartsComponent} from "./charts/charts.component";
import {AuthGuard} from "../shared/service/auth.guard";
import {FishFamilyResultComponent} from "./fish-family-result/fish-family-result.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    loadChildren: () => import('./login/login.module').then(i => i.LoginModule),
    pathMatch: 'full'
  },
  {
    path:'',
    component:LayoutComponent,
    children: [
      {
        path: 'fish-family-result',
        component: FishFamilyResultComponent,
        canActivate:[AuthGuard],
        loadChildren: () => import('./fish-family-result/fish-family-result.module').then(i => i.FishFamilyResultModule)
      },

      {
        path: 'dashboard',
        component: DashBoardComponent,
        canActivate:[AuthGuard],
        loadChildren: () => import('./dashboard/dash-board.module').then(i => i.DashBoardModule)
      },
      {
        path: 'charts',
        component: ChartsComponent,
        canActivate:[AuthGuard],
        loadChildren: () => import('./charts/charts.module').then(i => i.ChartModule),
      },
      {
        path: 'table',
        component: TableComponent,
        canActivate:[AuthGuard],
        loadChildren: () => import('./table/table.module').then(i => i.TableModule),
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
