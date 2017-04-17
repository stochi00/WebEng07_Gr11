import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './components/app.component';
import {LoginComponent} from './components/login.component';
import {OptionsComponent} from './components/options.component';
import {OverviewComponent} from './components/overview.component';
import {DetailsComponent} from './components/details.component';

const routes: Routes = [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
];

export const AppRoutesModule = RouterModule.forRoot(routes);
