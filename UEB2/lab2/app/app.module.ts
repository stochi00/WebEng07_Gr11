import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';

import {AppComponent} from './components/app.component';
import {AppRoutesModule} from "./app-routes.module";
import {LoginComponent} from "./components/login.component";
import {OptionsComponent} from "./components/options.component";
import {OverviewComponent} from "./components/overview.component";
import {DetailsComponent} from "./components/details.component";
import {DeviceComponent} from "./components/device.component";
import {StatusComponent} from "./components/status.component";
import {FooterComponent} from "./components/footer.component";
import {ControlBoolean} from "./components/control.boolean.component";
import {NavigationAccessibilityComponent} from "./components/navigation-accessbility.component";
import {ControlEnum} from "./components/control.enum.component";
import {ControlContinuous} from "./components/control.continuous.component";

import {DeviceService} from "./services/device.service";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ChartsModule,
        AppRoutesModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        OptionsComponent,
        OverviewComponent,
        DetailsComponent,
        DeviceComponent,
        ControlBoolean,
        ControlEnum,
        ControlContinuous,
        NavigationAccessibilityComponent,
        FooterComponent,
        StatusComponent
    ],
    providers: [DeviceService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
