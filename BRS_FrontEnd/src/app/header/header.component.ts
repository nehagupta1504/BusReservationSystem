import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from './../services/event-emitter.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userName;
  public currentUserId;
  public sessionStorage = sessionStorage;
  //id:number = Number(sessionStorage.getItem('currentUserId'));
  routingPath: string;
  constructor(private eventEmitterService: EventEmitterService, private route:Router ) {
    sessionStorage.setItem('isGuest',"Guest");
    sessionStorage.setItem('currentUserId', "0");
    sessionStorage.setItem('currentUser', "Guest");
    sessionStorage.setItem('walletAmount', "0");
    //this.loginOrLogOut();

  }
  tmp: string;
  loginOrLogOut() {
    //console.log("Inside loginOrLogout boolLogin=" + this.boolLogin);
    var login = document.getElementById("login");

    var logout = document.getElementById("logout");


    if (sessionStorage.getItem('currentUser') != null) {
      login.style.display = "none";
      logout.style.display = "block";

    }
    else {
      logout.style.display = "none";
      login.style.display = "block";
    }
    this.tmp = sessionStorage.getItem('currentUser');
    if (sessionStorage.getItem('adminId') != null) {
      document.getElementById("addroute").style.display = "block";
      document.getElementById("addbus").style.display = "block";
      document.getElementById("updatebus").style.display = "block";
    }
    console.log(sessionStorage.getItem('currentUser') != null);
    console.log(typeof (sessionStorage.getItem('currentUser')));
  }

  logOutTheUser() {
    var login = document.getElementById("login");
    var logout = document.getElementById("logout");
    sessionStorage.clear();
    logout.style.display = "none";
    login.style.display = "block";
    document.getElementById("addroute").style.display = "none";
    document.getElementById("addbus").style.display = "none";
    document.getElementById("updatebus").style.display = "none";
    sessionStorage.setItem('currentUserId', "0");
    sessionStorage.setItem('currentUser', "Guest");
    sessionStorage.setItem('walletAmount', "0");
    console.log(sessionStorage.getItem('id'));
    console.log(sessionStorage.getItem('currentUser'));
    console.log(sessionStorage.getItem('walletAmount'));

  }

  // findRoutingPath(){
  //   if(sessionStorage.getItem('currentUserId')=="0")
  //     this.routingPath = "['/signup/']";
  //   else
  //     this.routingPath = "['/profile/'"+sessionStorage.getItem('currentUserId')+"]";
  // }

  getProfile(){
    if(sessionStorage.getItem('isGuest')!=null){
     // console.log("ytytf");
      this.route.navigate(['enteremailbookingid']);
    }else{
      this.route.navigate(['bookinglist']);
     // console.log("signup");
    }
  }

  ngOnInit(): void {
    // this.loginOrLogOut();
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeHeaderComponentFunction.subscribe((name: string) => {
          this.loginOrLogOut();
        });
    }
  }

  name = "Guest";
  boolLogin = 1;
  getName() {

    if (sessionStorage.getItem('Name') != null) {
      this.name = sessionStorage.getItem('Name');
    } else {
      console.log(this.name);
    }
  }


}
