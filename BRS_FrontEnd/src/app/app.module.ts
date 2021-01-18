import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './CustomerModules/home/home.component';
import { LoginComponent } from './CustomerModules/login/login.component';
import { SignUpComponent } from './CustomerModules/sign-up/sign-up.component';
import { BusListComponent } from './CustomerModules/bus-list/bus-list.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './CustomerModules/profile/profile.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactusComponent } from './Pages/contactus/contactus.component';
import { TermsComponent } from './Pages/terms/terms.component';
import { ForgetPasswordComponent } from './CustomerModules/forget-password/forget-password.component';
import { ChangePasswordComponent } from './CustomerModules/change-password/change-password.component';
import { UpdateBusListComponent } from './AdminModules/update-bus-list/update-bus-list.component';
import { AdminLoginComponent } from './AdminModules/admin-login/admin-login.component';
import { AddBusComponent } from './AdminModules/add-bus/add-bus.component';
import { EditBusComponent } from './AdminModules/edit-bus/edit-bus.component';
import { EditRouteComponent } from './AdminModules/edit-route/edit-route.component';
import { RouteListComponent } from './AdminModules/route-list/route-list.component';
import { BookingComponent } from './CustomerModules/booking/booking.component';
import { PaymentModeComponent } from './CustomerModules/payment-mode/payment-mode.component';
import { FeedbackComponent } from './CustomerModules/feedback/feedback.component';
import { AskEmailBookingidComponent } from './CustomerModules/ask-email-bookingid/ask-email-bookingid.component';
import { ShowBookingComponent } from './CustomerModules/show-booking/show-booking.component';
import { BookingListComponent } from './CustomerModules/booking-list/booking-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    BusListComponent,
    ProfileComponent,
    AboutComponent,
    ContactusComponent,
    TermsComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    UpdateBusListComponent,
    AdminLoginComponent,
    AddBusComponent,
    EditBusComponent,
    EditRouteComponent,
    RouteListComponent,
    BookingComponent,
    PaymentModeComponent,
    FeedbackComponent,
    AskEmailBookingidComponent,
    ShowBookingComponent,
    BookingListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
