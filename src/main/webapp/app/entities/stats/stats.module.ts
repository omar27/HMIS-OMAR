import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HmisgatewaySharedModule } from 'app/shared/shared.module';
import { StatsComponent } from './stats.component';
import { StatsDetailComponent } from './stats-detail.component';
import { statsRoute, statsPopupRoute } from './stats.route';
import { ChartsModule } from 'ng2-charts';

const ENTITY_STATES = [...statsRoute, ...statsPopupRoute];

@NgModule({
  imports: [HmisgatewaySharedModule,
    ChartsModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [StatsComponent, StatsDetailComponent],
  entryComponents: []
})
export class HmisgatewayStatsModule {}
