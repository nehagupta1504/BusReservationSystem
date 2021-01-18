import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../services/customer-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IBooking } from '../../models/ibooking';
import { DataServiceService } from '../../services/data-service.service';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";
@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.css']
})
export class PaymentModeComponent implements OnInit {
  walletAmount = 0;
  fare;
  bookingData: IBooking;
  disableWallet = true;
  format = 'yyyy-MM-dd';
  locale = 'en-US';
  constructor(private customerservice: CustomerServiceService, private router: ActivatedRoute, private dataservice: DataServiceService, private route: Router) { }
  getWalletAmount() {
    var id = Number(sessionStorage.getItem('Id'));
    if (sessionStorage.getItem('Id') != null) {
      this.customerservice.getWalletAmountService(id).subscribe((data) => {
        this.walletAmount = data;
        if (this.bookingData.amount_paid <= this.walletAmount) {
          this.disableWallet = false;
        }
        console.log(this.bookingData.amount_paid);

      })

    }

  }
  paymentFromWallet() {
    this.bookingData.payment_mode = 'wallet';
    this.payment();
  }
  payment() {
    if (this.bookingData.payment_mode == null) {
      this.bookingData.payment_mode = 'others';
    }
    this.bookingData.status = 'booked';
    this.bookingData.dateOfBooking = this.bookingData.boardingDate;
    console.log(this.bookingData);
    this.customerservice.postBookingDetailsService(this.bookingData).subscribe(() => {
      alert("Booking Successful");
      console.log(this.bookingData);
      this.route.navigate(['/feedback']);
    }, error => {
      console.log(error.error.Message);
    })
  }
  ngOnInit(): void {
    this.fare = sessionStorage.getItem('fare');
    this.getWalletAmount();
    this.dataservice.bookingData.subscribe(data => {
      this.bookingData = data;
      //console.log(this.bookingData);
    })
  }

}
