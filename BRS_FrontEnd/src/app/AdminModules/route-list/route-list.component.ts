import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRoute } from 'src/app/models/ibus';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  routelist:IRoute[];
  constructor(private adminservice:AdminServiceService,private router: ActivatedRoute) { }

  GetAllRoute(){
    this.adminservice.getRouteList().subscribe((data) => {
      JSON.stringify(data);
      console.log(data[0].RouteId);
      this.routelist = data;
      console.log(this.routelist)
    },
      error => {
        alert(error.error.Message);
      }
    )
  }
  ngOnInit(): void {
    this.GetAllRoute();
  }

}
