import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBooking } from '../models/ibooking';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  ibooking: IBooking = {
    busId: null,
    cusId: null,
    email: null,
    boardingDate: null,
    dateOfBooking: null,
    status: null,
    noOfSeats: null,
    seatBooked: [],
    amount_paid: null,
    payment_mode: null,
    driver: false
  }
   bookingData: BehaviorSubject<IBooking>;

  constructor() {
    this.bookingData = new BehaviorSubject(this.ibooking);
  }
}
