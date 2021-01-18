import { Component, OnInit } from '@angular/core';
import { AdminServiceService} from './../../services/admin-service.service';

@Component({
  selector: 'app-update-bus-list',
  templateUrl: './update-bus-list.component.html',
  styleUrls: ['./update-bus-list.component.css']
})
export class UpdateBusListComponent implements OnInit {
  busList:any[];
  constructor(private adminservice:AdminServiceService) { 
     this.adminservice.getBusList().subscribe((data)=>{this.busList = data});
    // this.busList.forEach(function (value) {
    //   console.log(value.BusId);
    // });
    
  }


  ngOnInit(): void {
  }

}
