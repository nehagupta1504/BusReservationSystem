import { CustomerServiceService } from '../../services/customer-service.service';
import { ICust } from '../../models/icust';
import { ActivatedRoute, Router } from '@angular/router';

import { Component, Input, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookinglist:any[];
  cid = (Number)(sessionStorage.getItem('Id'));
  email = sessionStorage.getItem('Email');
  

  constructor(private customerservice: CustomerServiceService, private router: ActivatedRoute, private route: Router) { }

  GetBookings(){
    this.customerservice.getAllBookings(this.cid).subscribe((data) => {
      this.bookinglist = (data);
      console.log(data)
      console.log(this.bookinglist);
      console.log(this.cid);
    },
      error => {
        alert(error.error.Message);
      }
    )
  }
  

  ngOnInit(): void {
    this.GetBookings();
  }

}
