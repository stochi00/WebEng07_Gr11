import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './components/login.component';
import {OptionsComponent} from './components/options.component';
import {OverviewComponent} from './components/overview.component';
import {DetailsComponent} from './components/details.component';

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'}, // TODO
    {path: 'login', component: LoginComponent},
    {path: 'options', component: OptionsComponent},
    {path: 'overview', component: OverviewComponent},
    {path: 'details', component: DetailsComponent},
];

export const AppRoutesModule = RouterModule.forRoot(routes);
