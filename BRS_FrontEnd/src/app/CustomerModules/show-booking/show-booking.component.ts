import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ibook } from 'src/app/models/ibooking';
import { ICustomer } from 'src/app/models/icust';
import { CustomerServiceService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-show-booking',
  templateUrl: './show-booking.component.html',
  styleUrls: ['./show-booking.component.css']
})
export class ShowBookingComponent implements OnInit {

 booking:Ibook={
   BookingId:null,
   BusId:null,
   CustomerId:null,
   BookingDateTime:null,
   Status:null,
   NoOfSeats:null,
   AmountPaid:null,
   PaymentMode:null,
   Driver:null,
 }

  customer:ICustomer = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phNo: null,
    password: null,
    authorized: null,
    walletAmount: null,
    dob: null,
    address: null,
    gender: null,
  }
  bid:number;
  email:string;
  constructor(private router:Router, private route:ActivatedRoute,private customerservice: CustomerServiceService) { }


  getCustomerProfile(email:string) {

    
    console.log("\n");
    console.log("inside get customer profile info td=" + email);
    this.customerservice.getCustomerByEmailService1(email).subscribe((data) => {
      if(data==null){
        alert("Email doesn't exists");
        this.router.navigate(['/enteremailbookingid']);
      }else{
      JSON.stringify(data);
      console.log("data is"+ data);
      //console.log("data is"+ this.requiredCustomer);
      console.log("name is"+data.FirstName);
      this.customer.id = data.Id;
      this.customer.firstName = data.FirstName;
      this.customer.lastName = data.LastName;
      this.customer.email = data.Email;
      this.customer.phNo = data.PhNo;
      this.customer.password = data.Password;
      this.customer.authorized = data.Authorised;
      this.customer.walletAmount = data.WalletAmount;
      this.customer.dob = data.Dob;
      this.customer.address = data.Address;
      this.customer.gender = data.Gender;
      console.log("name is"+this.customer.id);
      }
    },
      error => {
        alert(error.error.Message);
      }
    )

  }

  getBooking(bid:number){

    this.customerservice.getBookingByBookingIdService(bid).subscribe((data) => {
      if(data==null){
        alert("Booking Id doesn't exists");
        this.router.navigate(['/enteremailbookingid']);
      }else{
      JSON.stringify(data);
      console.log("data is"+ data);
      //console.log("data is"+ this.requiredCustomer);
      console.log("name is"+data.FirstName);
      this.booking.BookingId = data.BookingId;
      this.booking.BusId = data.BusId;
      this.booking.CustomerId = data.CustomerId;
      this.booking.BookingDateTime = data.BookingDateTime;
      this.booking.Status = data.Status;
      this.booking.NoOfSeats = data.NoOfSeats;
      this.booking.AmountPaid = data.AmountPaid;
      this.booking.PaymentMode = data.PaymentMode;
      this.booking.Driver = data.Driver;
      
      }
    },
      error => {
        alert(error.error.Message);
      }
    )

  }

  cancelBooking(){
    alert("Booking Cancelled!");
    this.customerservice.cancelBookingService(this.booking.BookingId).subscribe(data=>{
      console.log(data);
    });
    this.router.navigate(['/'])
  }

  ngOnInit(): void {
    const bid = Number(this.route.snapshot.paramMap.get('bid'));
    const email = this.route.snapshot.paramMap.get('email');
    this.bid = bid;
    this.email = email.toString();
    console.log("RID:"+this.bid);
    console.log(typeof(this.bid));
    console.log("RID:"+this.email);
    console.log(typeof(this.email));
    console.log("RID:"+email);
    console.log(typeof(email));
    this.getCustomerProfile(email);
    this.getBooking(bid);
    //this.GetRoute();
  }

}
