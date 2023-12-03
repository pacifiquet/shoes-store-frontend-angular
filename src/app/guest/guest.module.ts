import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {HeroComponent} from './hero/hero.component';
import {HomeComponent} from './home/home.component';
import {NewArrivalComponent} from './new-arrival/new-arrival.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {RecommendedComponent} from './recommended/recommended.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {PasswordResetSaveComponent} from './password-reset-save/password-reset-save.component';
import {AccountVerificationComponent} from './account-verification/account-verification.component';
import {GuestRoutingModule} from './guest.routing.module';
import {SharedModule} from '../shared/shared.module';
import {TopSoldComponent} from './top-sold/top-sold.component';
import {RecentlyUpdatedComponent} from './recently-updated/recently-updated.component';

@NgModule({
  declarations: [
    HeroComponent,
    HomeComponent,
    RecommendedComponent,
    NewArrivalComponent,
    FooterComponent,
    ProductDetailsComponent,
    PasswordResetSaveComponent,
    AccountVerificationComponent,
    TopSoldComponent,
    RecentlyUpdatedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeroComponent,
    HomeComponent,
    RecommendedComponent,
    NewArrivalComponent,
    FooterComponent,
    ProductDetailsComponent,
    PasswordResetSaveComponent,
    AccountVerificationComponent,
    GuestRoutingModule,
    TopSoldComponent,
    RecentlyUpdatedComponent,
  ],
})
export class GuestModule {
  
}
