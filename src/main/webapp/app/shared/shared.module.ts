import { NgModule } from '@angular/core';
import { HmisgatewaySharedLibsModule } from './shared-libs.module';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [HmisgatewaySharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent, HasAnyAuthorityDirective],
  exports: [HmisgatewaySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent, HasAnyAuthorityDirective]
})
export class HmisgatewaySharedModule {}
