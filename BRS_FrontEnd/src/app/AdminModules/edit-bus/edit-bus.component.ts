import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBusStructure } from './../../models/ibus';
import { AdminServiceService } from './../../services/admin-service.service';

@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.css']
})
export class EditBusComponent implements OnInit {

  bus:IBusStructure={
    BusId:null,
    RouteId:null,
    AgencyNAme:null,
    BusType:null,
    DepartureTime: null,
    ArrivalTime:null,
    Fare:null,
    NoOfSeats:null
  };
  routeslist:any[]
  constructor(private adminservice: AdminServiceService, private router: Router, private route: ActivatedRoute) { }

  getRoutes()
  {
    this.adminservice. getRoutesService().subscribe((data)=>{this.routeslist=data});
    
  }
  getBusInfo(id: number):void{
    this.adminservice.getBus(id).subscribe((data:IBusStructure)=>{
      //JSON.stringify(data);
      this.bus.BusId = data.BusId;
      //console.log(data.BusId);
      this.bus=data;
    });
    
    console.log("get Bus info runnig");
    console.log(this.bus.BusId);
  }

  editBus(){
    console.log(this.bus.BusId);
    this.adminservice.editBus(this.bus).subscribe(()=>{
      alert("record edited");
      this.router.navigate(['updatebus']);
    });
  }

  saveBus(bus:IBusStructure):void{
    this.bus = bus;
    this.editBus();
    console.log("save bus running");
    console.log(this.bus.BusId);
  }

  ngOnInit(): void {
    const id=+this.route.snapshot.paramMap.get('id');
    this.getBusInfo(id);
  }

}
