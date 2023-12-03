import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../guest/login/login.component';
import { ResetPasswordComponent } from '../guest/reset-password/reset-password.component';
import { SignupComponent } from '../guest/signup/signup.component';
import { NotificationsComponent } from '../guest/notifications/notifications.component';
import { CartComponent } from '../guest/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewComponent } from './review/review.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DeleteModalComponent,
    LoginComponent,
    ResetPasswordComponent,
    SignupComponent,
    NotificationsComponent,
    HeaderComponent,
    CartComponent,
    ReviewComponent,
    StarRatingComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    NgbRatingModule,
    ReactiveFormsModule,
  ],
  exports: [
    DeleteModalComponent,
    LoginComponent,
    ResetPasswordComponent,
    SignupComponent,
    NotificationsComponent,
    HeaderComponent,
    CartComponent,
    ReviewComponent,
    StarRatingComponent,
  ],
})
export class SharedModule {}
