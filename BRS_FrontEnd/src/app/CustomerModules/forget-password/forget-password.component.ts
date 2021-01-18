import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getMaxListeners } from 'process';
import { IEmailForForgetPassword} from './../../models/icust';
import { IGetOTP} from './../../models/icust';
import { CustomerServiceService} from './../../services/customer-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  getEmailFromUserToGetOTP : IEmailForForgetPassword = {
    email:null
  }

  sendEmailToDb : IEmailForForgetPassword = {
    email:null
  }
  getOTPFromDB: IGetOTP = {
    otp : null
  }

  inputOTP: IGetOTP = {
    otp : null
  }


  constructor(private customerservice:CustomerServiceService, private router : Router) { }

  getEmailFromUser(getEmailFromUserToGetOTP : IEmailForForgetPassword){
    this.sendEmailToDb.email = getEmailFromUserToGetOTP.email;
    console.log("send to db "+this.sendEmailToDb.email);
    console.log("from user "+getEmailFromUserToGetOTP.email);
    this.verifyOTP();
    //document.getElementById("otpform").style.display = "block";
  }

  verifyOTP() {
    this.customerservice.getOTPFromDbToVerifyUser(this.sendEmailToDb.email).subscribe((otpFromDb) => {
      JSON.stringify(otpFromDb);
      this.getOTPFromDB.otp = otpFromDb;
      if(otpFromDb == "Registered Email Not Found"){
        document.getElementById("otpform").style.display = "none";
        alert("Please enter valid email, this email is nor registered");
      }
      else{
        alert("OTP sent to email Successfully, please enter otp");
        document.getElementById("otpform").style.display = "block";
      }
      
      console.log("response from db "+otpFromDb);
      //this.router.navigate(['/login']);
    })
  }

  getOTPFromUser(inputOTP:IGetOTP){
    //this.getOTPFromDB.otp = inputOTP.otp;
    //console.log("send to db "+inputOTP.otp);
    //console.log("response from db "+this.getOTPFromDB.otp);
    if(inputOTP.otp == this.getOTPFromDB.otp){
      alert("Email verified successfully");
      this.router.navigate(['/changepassword/',this.sendEmailToDb.email]);
    }else{
      alert("Otp didnot matched");
      this.router.navigate(['/login']);
    }


    
  }
  ngOnInit(): void {
  }

}
