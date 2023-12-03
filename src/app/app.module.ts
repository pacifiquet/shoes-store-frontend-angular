import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutPageComponent } from './guest/checkout-page/checkout-page.component';
import { NotfoundComponent } from './guest/erros/notfound/notfound.component';
import { UnauthorizedComponent } from './guest/erros/unauthorized/unauthorized.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { Router } from '@angular/router';
import { GuestModule } from './guest/guest.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  authReducer,
  clearState,
  deleteUserReducer,
  forgotPasswordReducer,
  registerReducer,
  requestChangePasswordReducer,
  requestNewTokenReducer,
  savePasswordReducer,
  verifyUserReducer,
} from './app.reducer';
import * as loggedEffect from './guest/store/user/effect';
import * as userUpdateEffect from './profile/store/effect';
import * as productsEffect from './guest/store/product/effect';
import * as adminEffect from './admin/store/effects';
import { ProfileModule } from './profile/profile.module';
import { AdminModule } from './admin/admin.module';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { SharedModule } from './shared/shared.module';
import { profileReducer, userUpdateReducer } from './app.reducer';
import {
  newArrivalProductsRecuder,
  productAndRecomReducer,
  productListByCategoryNewArrivalRecuder,
  productListByCategoryRecuder,
  productListReducer,
  recentUpdateRecuder,
  topSoldReducer,
} from './guest/store/product/productReducer';
import {
  addProductReducer,
  deleteListProductRecuder,
  deleteProductReducer,
  productDetailsReducer,
  updateProductReduder,
  uploadProductListReducer,
} from './admin/store/admin.reducers';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutPageComponent,
    NotfoundComponent,
    UnauthorizedComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    GuestModule,
    AdminModule,
    SharedModule,
    ProfileModule,
    StoreModule.forRoot(
      {
        auth: authReducer,
        profile: profileReducer,
        updateUser: userUpdateReducer,
        register: registerReducer,
        userDelete: deleteUserReducer,
        verifyUser: verifyUserReducer,
        requestNewToken: requestNewTokenReducer,
        changePassword: requestChangePasswordReducer,
        forgotPassword: forgotPasswordReducer,
        savePassword: savePasswordReducer,
        productList: productListReducer,
        deleteProducts: deleteListProductRecuder,
        uploadProducts: uploadProductListReducer,
        topSoldproductList: topSoldReducer,
        productDetails: productDetailsReducer,
        productAndRecom: productAndRecomReducer,
        recentUpdate: recentUpdateRecuder,
        newArrivalProductList: newArrivalProductsRecuder,
        productsCategory: productListByCategoryRecuder,
        productsCategoryNewArrival: productListByCategoryNewArrivalRecuder,
        addProduct: addProductReducer,
        deleteProduct: deleteProductReducer,
        updateProduct: updateProductReduder,
      },
      { metaReducers: [clearState] }
    ),
    EffectsModule.forRoot([
      loggedEffect,
      userUpdateEffect,
      productsEffect,
      adminEffect,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }
}
