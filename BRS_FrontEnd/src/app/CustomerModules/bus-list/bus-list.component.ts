
import { CustomerServiceService } from '../../services/customer-service.service';
import { ICust } from '../../models/icust';
import { ActivatedRoute, Router } from '@angular/router';

import { Component, Input, OnInit } from '@angular/core';
import { IBooking } from '../../models/ibooking';
import { DataServiceService } from '../../services/data-service.service';
@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {
  buslist: ICust[];



  seats = 24;
  seatlist: boolean[];
  seatlistDB: boolean[];
  rowNo: string[] = ['A', 'B', 'C', 'D'];
  disableValue: boolean;
  seatno;
  fare = 0;
  DBfare;
  busId;
  boardingDate;
  bookingData: IBooking;
  paymentButton = true;
  constructor(private customerservice: CustomerServiceService, private router: ActivatedRoute, private dataservice: DataServiceService, private route: Router) { }

  //Get the seat no.
  getSeatNo(row, col) {
    this.seatno = (row - 1) * 6 + col;
    this.seatlist[this.seatno] = true;
    console.log("seat no. =" + this.seatno + " assigned" + this.seatlist[this.seatno]);
    var x = "S" + this.seatno;
    sessionStorage.setItem(x, 'true');
    this.fare = this.fare + this.DBfare;
    //data service to pass data b/w components
    this.dataservice.bookingData.subscribe(data => {
      this.bookingData = data;
      var count = 0;
      this.bookingData.seatBooked[0] = false;
      for (var i = 1; i <= 24; i++) {
        this.bookingData.seatBooked[i] = this.seatlist[i];
        if (this.seatlist[i] == true) {
          count++;
        }

      }
      this.bookingData.noOfSeats = count;
      this.bookingData.amount_paid = this.fare;
      this.bookingData.busId = this.busId;
      this.bookingData.boardingDate = this.boardingDate;
      if (this.bookingData.noOfSeats > 0) {
        this.paymentButton = false;
      }
      console.log("inside bus-list" + this.bookingData.amount_paid);
    })

  }
  //calling api
  getSeatDetailsWithFare(busid: number, traveldate: Date) {
    this.customerservice.getSeatDetailsWithFareServie(busid, traveldate).subscribe((data: any) => {
      this.seatlistDB[1] = data.S1;
      this.seatlistDB[2] = data.S2;
      this.seatlistDB[3] = data.S3;
      this.seatlistDB[4] = data.S4;
      this.seatlistDB[5] = data.S5;
      this.seatlistDB[6] = data.S6;
      this.seatlistDB[7] = data.S7;
      this.seatlistDB[8] = data.S8;
      this.seatlistDB[9] = data.S9;
      this.seatlistDB[10] = data.S10;
      this.seatlistDB[11] = data.S11;
      this.seatlistDB[12] = data.S12;
      this.seatlistDB[13] = data.S13;
      this.seatlistDB[14] = data.S14;
      this.seatlistDB[15] = data.S15;
      this.seatlistDB[16] = data.S16;
      this.seatlistDB[17] = data.S17;
      this.seatlistDB[18] = data.S18;
      this.seatlistDB[19] = data.S19;
      this.seatlistDB[20] = data.S20;
      this.seatlistDB[21] = data.S21;
      this.seatlistDB[22] = data.S22;
      this.seatlistDB[23] = data.S23;
      this.seatlistDB[24] = data.S24;
      this.DBfare = data.Fare;
    })

    this.busId = busid;
    this.boardingDate = traveldate;


  }
  //Bus Information List

  getBusInfo(from: string, to: string, traveldate: Date) {

    console.log("\n");
    console.log("inside get Bus info td=" + traveldate);
    this.customerservice.getBusList(from, to, traveldate).subscribe((data: ICust[]) => {
      this.buslist = data;
    },
      error => {
        alert(error.error.Message);
      }
    )


  }

  ngOnInit(): void {
    const from = this.router.snapshot.paramMap.get("from");
    const to = this.router.snapshot.paramMap.get('to');
    const traveldate = new Date(this.router.snapshot.paramMap.get('traveldate'));
    this.getBusInfo(from, to, traveldate);

    var busseatmap = document.getElementById('busseatmmap');
    this.seatlist = new Array(this.seats + 1).fill(false);
    this.seatlistDB = new Array(this.seats + 1).fill(false);

  }
} 