import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IRoute } from 'src/app/models/ibus';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.css']
})
export class EditRouteComponent implements OnInit {
  route:IRoute={
    RouteId:null,
    Source:null,
    Destination:null,
    Distance:null
  };
  rid:number;

  constructor(private adminservice:AdminServiceService, private router: ActivatedRoute, private rrouter: Router) { }

  GetRoute(){
    this.adminservice.getRoute(this.rid).subscribe((data) => {
      this.route = (data);
      console.log(this.route);
    },
      error => {
        alert(error.error.Message);
      }
    )
  }

  SaveRoute(eroute:IRoute){
    this.adminservice.putRoute(this.route).subscribe(
      ()=>{
        alert("Route Edited...");
        this.rrouter.navigate(['routelist']);
      }
      );
  }

  ngOnInit(): void {
    this.rid =+ this.router.snapshot.paramMap.get('rid');
    console.log("RID:"+this.rid);
    console.log(typeof(this.rid));
    this.GetRoute();
  }

}
