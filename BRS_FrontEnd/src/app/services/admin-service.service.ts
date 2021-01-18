import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, observable, of } from 'rxjs';
import { ICust, IpRegCust, SendRegCust, sendLoginCust, ICustomer, IGetOTP } from 'src/app/models/icust';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";
import { Iaddbus, IBusStructure } from './../models/ibus';

import { IRoute } from 'src/app/models/ibus';

registerLocaleData(localeES, "es");

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {


  locale = 'en-US';

  url = 'http://localhost/Ride-On/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }
  loginAdminService(email: string, password: string): Observable<any> {
    return this.http.get<any>(this.url + "RegistrationLogin/GetAdmin?email=" + email + "&password=" + password);

  }

  getBusList(): Observable<any[]> {
    return this.http.get<any[]>(this.url + "Admin/GetAllBusesWithRouteInfo");
  }

  getBus(id: number): Observable<IBusStructure> {
    return this.http.get<IBusStructure>(this.url + "Admin/GetBus?busid=" + id);
  }
  editBus(bus: IBusStructure): Observable<IBusStructure> {
    console.log("inside service" + bus.BusId);
    return this.http.put<IBusStructure>(this.url + "Admin/PutBus/" + bus.BusId + "/", bus, this.httpOptions);
  }
  getRoutesService(): Observable<any[]> {
    return this.http.get<any[]>(this.url + "Admin/GetAllRoute");
  }
  addingBusService(addbus: Iaddbus): Observable<Iaddbus> {
    return this.http.post<Iaddbus>(this.url + "Admin/PostBus", addbus, this.httpOptions)
  }

  getRouteList(): Observable<IRoute[]> {
    return this.http.get<IRoute[]>(this.url + "Admin/GetAllRoute");
  }

  getRoute(rid: number): Observable<IRoute> {
    return this.http.get<IRoute>(this.url + "Admin/GetRoute?routeid=" + rid);
  }

  putRoute(route: IRoute): Observable<IRoute> {
    return this.http.put<IRoute>(this.url + "Admin/PutRoute/" + route.RouteId, route, this.httpOptions);
  }
}
