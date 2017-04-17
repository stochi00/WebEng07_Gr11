import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';

import {AppComponent} from './components/app.component';
import {AppRoutesModule} from "./app-routes.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ChartsModule,
        AppRoutesModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
