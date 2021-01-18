import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './CustomerModules/login/login.component';
import { HomeComponent } from './CustomerModules/home/home.component';
import { SignUpComponent } from './CustomerModules/sign-up/sign-up.component';
import { BusListComponent } from './CustomerModules/bus-list/bus-list.component';
import { ProfileComponent } from './CustomerModules/profile/profile.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactusComponent } from './Pages/contactus/contactus.component';
import { TermsComponent } from './Pages/terms/terms.component';
import { ForgetPasswordComponent } from './CustomerModules/forget-password/forget-password.component';
import { ChangePasswordComponent } from './CustomerModules/change-password/change-password.component';
import { AdminLoginComponent } from './AdminModules/admin-login/admin-login.component';
import { UpdateBusListComponent } from './AdminModules/update-bus-list/update-bus-list.component';
import { EditBusComponent } from './AdminModules/edit-bus/edit-bus.component';
import { AddBusComponent } from './AdminModules/add-bus/add-bus.component';
import { EditRouteComponent } from './AdminModules/edit-route/edit-route.component';
import { RouteListComponent } from './AdminModules/route-list/route-list.component';
import { BookingComponent } from './CustomerModules/booking/booking.component';
import { PaymentModeComponent } from './CustomerModules/payment-mode/payment-mode.component';
import { FeedbackComponent } from './CustomerModules/feedback/feedback.component';
import { AskEmailBookingidComponent } from './CustomerModules/ask-email-bookingid/ask-email-bookingid.component';
import { ShowBookingComponent } from './CustomerModules/show-booking/show-booking.component';
import { BookingListComponent } from './CustomerModules/booking-list/booking-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login/:email/:password', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'buslist/:from/:to/:traveldate', component: BusListComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'changepassword/:email', component: ChangePasswordComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'updatebus', component: UpdateBusListComponent },
  { path: 'editbus/:id', component: EditBusComponent },
  { path: 'addbus', component: AddBusComponent },
  { path: 'editroute/:rid', component: EditRouteComponent },
  { path: 'routelist', component: RouteListComponent },
  { path: 'booking/:busid/:traveldate/:fare', component: BookingComponent },
  { path: 'payment', component: PaymentModeComponent },
  { path: 'feedback', component: FeedbackComponent },

  { path: 'enteremailbookingid', component: AskEmailBookingidComponent},
  { path: 'showbooking/:email/:bid',component:ShowBookingComponent},
  { path: 'bookinglist',component:BookingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
