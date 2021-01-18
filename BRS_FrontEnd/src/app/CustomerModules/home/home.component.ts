import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IBus } from 'src/app/models/IBus';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bus: IBus = { from: null, to: null, traveldate: null }

  
  constructor(private http: HttpClient) {}


  ngOnInit(): void {
  }

}
