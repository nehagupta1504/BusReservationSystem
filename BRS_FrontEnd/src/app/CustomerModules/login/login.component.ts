import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../services/customer-service.service';
import { sendLoginCust, sessionObj } from '../../models/icust';
import { LoggedInCust } from './../../models/icust';
import { HeaderComponent } from './../../header/header.component';
import { Router } from '@angular/router';
import { Session } from 'protractor';
import { EventEmitterService } from './../../services/event-emitter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sendlogincust: sendLoginCust = {
    email: null,
    password: null
  }

  value: sessionObj = {
    Id: null,
    FirstName: null,
    LastName: null,
    Email: null,
    PhNo: null,
    Password: null,
    Authorised: null,
    WalletAmount: null,
    Dob: null,
    Address: null,
    Gender: null
  };
  // id:number;
  constructor(private customerservice: CustomerServiceService, private router: Router, private eventEmitterService: EventEmitterService) {

  }
  loginCustomer() {
    this.customerservice.loginCustomerService(this.sendlogincust.email, this.sendlogincust.password).subscribe((data: LoggedInCust) => {
      sessionStorage.setItem('item', JSON.stringify(data));
      if(data.Email==null){
        alert("Invalid E-mail id or password");
      }
      else{
        alert("Login Successfull");
        // console.log(typeof(data));
        // console.log(data.Id);
        // console.log(data.PhNo);
        // console.log(data.FirstName);
        // this.id = data.Id;
        //sessionStorage.clear();
        this.value = data;
        sessionStorage.removeItem('isGuest');
        this.sessionStorage();
        
        sessionStorage.setItem('currentUserId', data.Id.toString());
        sessionStorage.setItem('currentUser', data.FirstName);
        sessionStorage.setItem('currentUserEmail',data.Email);
        sessionStorage.setItem('walletAmount', data.WalletAmount.toString());
        console.log(sessionStorage.getItem('item'));
        console.log(sessionStorage.getItem('currentUserId'));
        console.log(sessionStorage.getItem('currentUser'));
        console.log(sessionStorage.getItem('walletAmount'));
        this.loginComponentFunction();

        this.router.navigate(['/']);
      }
    }, error => {
      alert(error.error.Message);
    }
    )
  }
  sessionStorage() {
    sessionStorage.setItem('Id', this.value.Id.toString());
    sessionStorage.setItem('Name', this.value.FirstName);
    sessionStorage.setItem('Email', this.value.Email);
  }
  getloginDetais(sendlogincust: sendLoginCust) {
    this.sendlogincust = sendlogincust;
    this.loginCustomer();
  }

  loginComponentFunction() {
    this.eventEmitterService.onLoginComponentButtonClick();

  }
  ngOnInit(): void {
  }

}