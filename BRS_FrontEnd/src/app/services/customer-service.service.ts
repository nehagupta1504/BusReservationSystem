import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, observable, of } from 'rxjs';

import { ICust, IpRegCust, SendRegCust, sendLoginCust, sessionObj, ICustomer, IGetOTP, IUser } from 'src/app/models/icust';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";
import { ITour } from '../models/IBus';
import { Identifiers } from '@angular/compiler';
import { IBooking, walletUpdate, IFeedback } from '../models/ibooking';
registerLocaleData(localeES, "es");
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  format = 'yyyy-MM-dd';
  myDate = 'thu 2019-06-29';
  locale = 'en-US';
  formattedDate2 = formatDate(this.myDate, this.format, this.locale);
  formattedDate
  url = 'http://localhost/Ride-On/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }



  getBusList(from: string, to: string, traveldate: Date): Observable<ICust[]> {
    this.formattedDate = formatDate(traveldate, this.format, this.locale);
    return this.http.get<ICust[]>(this.url + "BusAvailability/Search?src=" + from + "&dest=" + to + "&startDate=" + this.formattedDate);
  }

  registerCustomerService(regcust: SendRegCust): Observable<SendRegCust> {
    return this.http.post<SendRegCust>(this.url + "RegistrationLogin/PostCustomer", regcust, this.httpOptions);
  }


  loginCustomerService(email: string, password: string): Observable<sessionObj> {
    return this.http.get<sessionObj>(this.url + "RegistrationLogin/GetCustomer?email=" + email + "&password=" + password);
  }
  getSeatDetailsWithFareServie(busid: number, traveldate: Date): Observable<any[]> {
    return this.http.get<any[]>(this.url + "Reservation/GetSeatMapWithFare?BusId=" + busid + "&BoardDate=" + traveldate);
  }
  getCustomerByEmailService(email: string): Observable<SendRegCust> {
    return this.http.get<SendRegCust>(this.url + "RegistrationLogin/GetCustomer?email=" + email);
  }

  getCustomerByEmailService1(email: string): Observable<any> {
    return this.http.get<any>(this.url + "RegistrationLogin/GetCustomer?email=" + email);
  }

  getBookingByBookingIdService(bid: number): Observable<any> {
    return this.http.get<any>(this.url + "Cancellation/GetBooking?id=" + bid);
  }

  getBusDetailsByIdService(id: number, traveldate: Date): Observable<ITour> {
    this.formattedDate = formatDate(traveldate, this.format, this.locale);
    return this.http.get<ITour>(this.url + "BusAvailability/SearchByTwo?id=" + id + "&startDate=" + this.formattedDate);
  }
  getWalletAmountService(id: number): Observable<any> {
    return this.http.get<any>(this.url + "Reservation/GetWalletAmount?CustId=" + id);
  }
  postBookingDetailsService(bookingData: IBooking): Observable<any> {
    return this.http.post<any>(this.url + "Reservation/PostBooking", bookingData, this.httpOptions);
  }
  postFeedbackService(iFeedback: IFeedback): Observable<any> {
    return this.http.post<any>(this.url + "Reservation/PostFeedback", iFeedback, this.httpOptions);
  }
  getOTPFromDbToVerifyUser(email: string): Observable<any> {
    return this.http.get<any>(this.url + "RegistrationLogin/Getotp?email=" + email);
  }
  getCustomerByIdService(id: number): Observable<any> {
    return this.http.get<any>(this.url + "RegistrationLogin/GetCustomer/" + id);
  }
  updateCustomerService(id: number, updatedCustomer: IUser): Observable<any> {
    return this.http.put<any>(this.url + "RegistrationLogin/PutCustomer/" + id + "/", updatedCustomer, this.httpOptions);
  }

  updateCustomerService1(id: number, updatedCustomer: ICustomer): Observable<any> {
    return this.http.put<any>(this.url + "RegistrationLogin/PutCustomer/" + id + "/", updatedCustomer, this.httpOptions);
  }

  getAllBookings(cid: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + "Cancellation/GetAllBookings?cusId=" + cid);
  }

  cancelBookingService(bid: number): Observable<any> {
    return this.http.post<any>(this.url + "Cancellation/CancelBooking?id=" + bid, this.httpOptions);
  }

}