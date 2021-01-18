import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from '../../services/customer-service.service';
import { ICustomer, SendRegCust, IUser } from '../../models/icust';
import { IChangePassword } from '../../models/icust';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  customer: ICustomer = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phNo: null,
    password: null,
    authorized: null,
    walletAmount: null,
    dob: null,
    address: null,
    gender: null,
  };

  changePassword: IChangePassword = {
    password: null,
    confirmPassword: null,
  };

  updatedCustomer: IUser = {
    //id: null,
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
  };

  constructor(private customerservice: CustomerServiceService, private router: ActivatedRoute, private rrouter: Router) { }

  getCustomerProfile(email: string) {

    console.log("\n");
    console.log("inside get customer profile info td=" + email);
    this.customerservice.getCustomerByEmailService1(email).subscribe((data:any) => {
      JSON.stringify(data);
      console.log("data is" + data);
      console.log("data is" + data.Id);
      //console.log("data is"+ this.requiredCustomer);
      console.log("name is" + data.FirstName);
      this.customer.id = data.Id;
      this.customer.firstName = data.FirstName;
      this.customer.lastName = data.LastName;
      this.customer.email = data.Email;
      this.customer.phNo = data.PhNo.toString();
      this.customer.password = data.Password;
      this.customer.authorized = data.Authorised;
      this.customer.walletAmount = data.WalletAmount;
      this.customer.dob = data.Dob;
      this.customer.address = data.Address;
      this.customer.gender = data.Gender;
      console.log("name is" + this.customer.id);
    },
      error => {
        alert(error.error.Message);
      }
    )

  }


  showChangePwd() {
    document.getElementById("showinfo").style.display = "none";
    document.getElementById("changepwd").style.display = "block";
  }

  getNewPassword(changePassword: IChangePassword) {
    //this.updatedCustomer.id = this.customer.id;
    this.updatedCustomer.FirstName = this.customer.firstName;
    this.updatedCustomer.LastName = this.customer.lastName;
    this.updatedCustomer.Email = this.customer.email;
    this.updatedCustomer.PhNo = Number(this.customer.phNo);
    this.updatedCustomer.Authorised = this.customer.authorized;
    this.updatedCustomer.WalletAmount = this.customer.walletAmount;
    this.updatedCustomer.Dob = this.customer.dob;
    this.updatedCustomer.Address = this.customer.address;
    this.updatedCustomer.Gender = this.customer.gender;
    if (changePassword.password == changePassword.confirmPassword) {
      this.updatedCustomer.Password = changePassword.password;
      this.updateCustomer();
    }
    else {
      alert("Password doesn't matched");
      this.updatedCustomer.Password = this.customer.password;
    }

  }

  updateCustomer() {
    this.customerservice.updateCustomerService(this.customer.id, this.updatedCustomer).subscribe(() => {
      alert("Password Changed Successfully");
      this.rrouter.navigate(['/']);
    })
  }

  ngOnInit(): void {
    const email = this.router.snapshot.paramMap.get("email");
    console.log(email);
    this.getCustomerProfile(email);
  }

}