import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../services/customer-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IBooking, IFeedback } from '../../models/ibooking';
import { DataServiceService } from '../../services/data-service.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  bookingData: IBooking;
  iFeedback: IFeedback = {
    email: null,
    comment: null,
    rating: null,
    dateOfFeedback: null,
  }
  rating;
  ratingValue;
  comment;
  constructor(private customerservice: CustomerServiceService, private router: Router, private dataservice: DataServiceService) { }
  ratingFunction5() {
    this.rating = "Excellent";
    document.getElementById('lbl').style.display = "block";
    this.ratingValue = 5;
  }
  ratingFunction4() {
    this.rating = "Good";
    document.getElementById('lbl').style.display = "block";
    this.ratingValue = 4;
  }
  ratingFunction3() {
    this.rating = "Average";
    document.getElementById('lbl').style.display = "block";
    this.ratingValue = 3;
  }
  ratingFunction2() {
    this.rating = "Poor";
    document.getElementById('lbl').style.display = "block";
    this.ratingValue = 2;
  }
  ratingFunction1() {
    this.rating = "Very Poor";
    document.getElementById('lbl').style.display = "block";
    this.ratingValue = 1;
  }
  feedbackSubmit() {
    this.iFeedback.email = this.bookingData.email;
    this.iFeedback.rating = this.ratingValue;
    this.iFeedback.comment = this.comment;
    this.iFeedback.dateOfFeedback = this.bookingData.boardingDate;
    console.log(this.comment);
    console.log(this.iFeedback);
    this.customerservice.postFeedbackService(this.iFeedback).subscribe(() => {
      alert("Feedback Submitted, For ticket details Go to your booking section");
      this.router.navigate(['']);
    })
  }

  ngOnInit(): void {
    document.getElementById('lbl').style.display = "none";
    this.dataservice.bookingData.subscribe(data => {
      this.bookingData = data;
      //console.log(this.bookingData);
    })
  }

}
