import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { AppComponent }         from './components/app.component';
import {LoginComponent} from "./components/login.component";

/*const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
];*/

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    //RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
