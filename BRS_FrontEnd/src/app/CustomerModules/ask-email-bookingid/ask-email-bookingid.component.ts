import { Component, OnInit } from '@angular/core';
import {IEmailAndBookingId} from './../../models/icust';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ask-email-bookingid',
  templateUrl: './ask-email-bookingid.component.html',
  styleUrls: ['./ask-email-bookingid.component.css']
})
export class AskEmailBookingidComponent implements OnInit {

  emailAndBooking : IEmailAndBookingId = {
    email:null,
    bookingId:null
  }

  constructor(private route:Router) { }

  getEmailAndBookingId(emailAndBooking:IEmailAndBookingId){
    this.emailAndBooking = emailAndBooking;
    this.route.navigate(['/showbooking/',this.emailAndBooking.email,this.emailAndBooking.bookingId]);
    
  }
  ngOnInit(): void {
  }

}
