import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OverviewComponent} from './components/overview.component';
import {LoginComponent} from './components/login.component';
import {OptionsComponent} from './components/options.component';
import {DeviceDetailsComponent} from "./components/device-details.component";

//TODO Setzen Sie Angular Guards ein um einen unbefugten Zugriff zu verhindern
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'overview', component: OverviewComponent},
  {path: 'options', component: OptionsComponent},
  {path: 'details/:id', component: DeviceDetailsComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
