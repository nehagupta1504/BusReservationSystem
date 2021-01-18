import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Iaddbus } from './../../models/ibus';

import {AdminServiceService} from 'src/app/services/admin-service.service'

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit {

  addbus:Iaddbus={
    RouteId:null,
    AgencyNAme:null,
    BusType:null,
    DepartureTime: null,
    ArrivalTime:null,
    Fare:null,
    NoOfSeats:null
  }
  routeslist:any[]

  constructor(private adminservice: AdminServiceService, private router: Router) { }

  addingBus() {
    this.adminservice.addingBusService(this.addbus).subscribe(() => {
      alert("Bus added succesfully");
      this.router.navigate(['updatebus']);
    })
  }
  getRoutes()
  {
    this.adminservice.getRoutesService().subscribe((data)=>{this.routeslist=data});
    
  }
  AddBusDetails(addbus:Iaddbus)
  {
    this.addbus=addbus;
    this.addingBus();
  }
  
  ngOnInit(): void {
  }

}
