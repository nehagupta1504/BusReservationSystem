import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IpRegCust, SendRegCust } from '../../models/icust';
import { CustomerServiceService } from '../../services/customer-service.service'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  regcust: IpRegCust = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    contactNo: null
  }
  sendregcust: SendRegCust = {
    id: null,
    FirstName: null,
    LastName: null,
    Email: null,
    PhNo: null,
    Password: null,
    Authorised: null,
    WalletAmount: null,
    Dob: null,
    Address: null,
    Gender: null,
  }
  constructor(private customerservice: CustomerServiceService, private router: Router) { }
  registerCustomer() {
    this.customerservice.registerCustomerService(this.sendregcust).subscribe(() => {
      alert("Customer Resgistered Successfully");
      this.router.navigate(['/login']);
    })
  }
  getCustomerDetails(regcust: IpRegCust) {
    this.sendregcust.FirstName = regcust.firstName;
    this.sendregcust.LastName = regcust.lastName;
    this.sendregcust.Email = regcust.email;
    this.sendregcust.PhNo = regcust.contactNo;
    this.sendregcust.Password = regcust.password;
    this.sendregcust.Authorised = true;
    this.sendregcust.WalletAmount = 2000;
    this.sendregcust.Dob = null;
    this.sendregcust.Address = null;
    this.sendregcust.Gender = null;
    if (this.regcust.password == this.regcust.confirmPassword) {
      this.registerCustomer();
    } else {
      alert("Password doesn't match");
    }
  }
  ngOnInit(): void {
  }

}
