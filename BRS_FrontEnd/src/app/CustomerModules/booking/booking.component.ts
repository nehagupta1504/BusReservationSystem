import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IpRegCust, SendRegCust } from 'src/app/models/icust';
import { ITour } from '../../models/ibus';
import { CustomerServiceService } from '../../services/customer-service.service';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";
import { IBooking } from '../../models/ibooking';
import { DataServiceService } from '../../services/data-service.service';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  busDetails: ITour = {
    BusNumber: null,
    AgencyNAme: null,
    Source: null,
    Destination: null,
    BoardingDate: null,
    DroppingDate: null
  }
  boardingDate;
  droppingDate;
  format = 'dd/MM/yyyy';
  myDate = 'thu 2019-06-29';
  locale = 'en-US';
  regcust: IpRegCust = {
    firstName: null,
    lastName: null,
    email: null,
    password: '123',
    confirmPassword: '123',
    contactNo: null
  }
  sendregcust: SendRegCust = {
    id: null,
    FirstName: null,
    LastName: null,
    Email: null,
    PhNo: null,
    Password: null,
    Authorised: null,
    WalletAmount: null,
    Dob: null,
    Address: null,
    Gender: null,
  }
  bookingData: IBooking;
  constructor(private customerservice: CustomerServiceService, private router: ActivatedRoute, private route: Router, private dataservice: DataServiceService) { }
  getUserDetails() {
    if (sessionStorage.getItem('Email') != null) {
      var email = sessionStorage.getItem('Email');
      this.customerservice.getCustomerByEmailService(email).subscribe((data: SendRegCust) => {
        this.regcust.firstName = data.FirstName;
        this.regcust.lastName = data.LastName;
        this.regcust.email = data.Email;
        this.regcust.contactNo = data.PhNo;
        //data service for sending booking data after final payment If user is present in database
        this.bookingData.email = this.regcust.email;
      })

    }

  }
  async sendDetails() {
    var dataExists = false;
    await this.customerservice.getCustomerByEmailService(this.regcust.email).subscribe((data) => {
      if (data == null && sessionStorage.getItem('Email') == null) {
        this.sendregcust.FirstName = this.regcust.firstName;
        this.sendregcust.LastName = this.regcust.lastName;
        this.sendregcust.Email = this.regcust.email;
        this.sendregcust.PhNo = this.regcust.contactNo;
        this.sendregcust.Password = this.regcust.password;
        this.sendregcust.Authorised = false;
        this.sendregcust.WalletAmount = 0;
        this.sendregcust.Dob = null;
        this.sendregcust.Address = null;
        this.sendregcust.Gender = null;
        this.customerservice.registerCustomerService(this.sendregcust).subscribe(() => {
          alert("Customer Details sent");
          this.route.navigate(['payment']);
        })
        //data service for sending booking data after final payment If user is using service for the first time
        this.bookingData.email = this.sendregcust.Email;

      } else {
        this.bookingData.email = this.regcust.email;
        this.route.navigate(['payment']);
      }
      dataExists = true;
    })
  }

  getBusDetails(busid: number, traveldate: Date) {
    this.customerservice.getBusDetailsByIdService(busid, traveldate).subscribe((data: ITour) => {
      this.busDetails = data;
      this.boardingDate = formatDate(this.busDetails.BoardingDate, this.format, this.locale);
      this.droppingDate = formatDate(this.busDetails.DroppingDate, this.format, this.locale);
    })

  }
  ngOnInit(): void {
    const busid = Number(this.router.snapshot.paramMap.get("busid"));
    const traveldate = new Date(this.router.snapshot.paramMap.get("traveldate"));
    const fare = + this.router.snapshot.paramMap.get("fare");
    sessionStorage.setItem('fare', fare.toString());
    this.getUserDetails();
    this.getBusDetails(busid, traveldate);
    //extra
    this.dataservice.bookingData.subscribe(data => {
      this.bookingData = data;
      //console.log(this.bookingData);
    })
  }

}
