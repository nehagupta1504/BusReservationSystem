import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { sendLoginCust } from '../../models/icust';
import { LoggedInCust} from './../../models/icust';
import {HeaderComponent} from './../../header/header.component';
import { Router } from '@angular/router';
import { Session } from 'protractor';
import { EventEmitterService } from './../../services/event-emitter.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  sendlogincust: sendLoginCust = {
    email: null,
    password: null
  }

  constructor(private adminservice: AdminServiceService, private router: Router, private eventEmitterService: EventEmitterService) { }

  loginAdmin() {
    this.adminservice.loginAdminService(this.sendlogincust.email, this.sendlogincust.password).subscribe((data) => {
      //alert("Login Successfull");
      // console.log("login admin called");
      // console.log(data.Id);
      // console.log(data.PhNo);
      // console.log(data.FirstName);
      // this.id = data.Id;
      
     
      sessionStorage.setItem('item',JSON.stringify(data));
      if(data.Message=="Not Found"){
        alert("Invalid E-mail or passsword");
      }else{
        sessionStorage.setItem('currentUserId', "-1");
        sessionStorage.setItem('currentUser', "Admin");
        sessionStorage.setItem('adminId',data.Id);
        this.loginComponentFunction();
        //console.log(sessionStorage.getItem('item'));
        alert("Login Successfull");
        // sessionStorage.setItem('currentUserId', "-1");
        // sessionStorage.setItem('currentUser', "Admin");
        // sessionStorage.setItem('adminId',data.Id);
        //sessionStorage.removeItem('isGuest');
        this.router.navigate(['/']);
      }
      
      
    }, error => {
      alert(error.error.Message);
    }
    )
  }

  getloginDetais(sendlogincust: sendLoginCust) {
    this.sendlogincust = sendlogincust;
    this.loginAdmin();
  }

  loginComponentFunction(){    
    this.eventEmitterService.onLoginComponentButtonClick(); 
     
  }

  ngOnInit(): void {
  }

}
