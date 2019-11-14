import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { HmisgatewaySharedModule } from 'app/shared/shared.module';
import { HmisgatewayCoreModule } from 'app/core/core.module';
import { HmisgatewayAppRoutingModule } from './app-routing.module';
import { HmisgatewayHomeModule } from './home/home.module';
import { HmisgatewayEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    BrowserModule,
    HmisgatewaySharedModule,
    HmisgatewayCoreModule,
    HmisgatewayHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    HmisgatewayEntityModule,
    HmisgatewayAppRoutingModule,
    ChartsModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class HmisgatewayAppModule {}
