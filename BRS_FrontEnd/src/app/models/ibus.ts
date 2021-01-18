
import { Time } from "@angular/common";


export interface IBus {
    to: string;
    from: string;
    traveldate: Date;
}


export interface IBusStructure {
    BusId: number;
    RouteId: number;
    AgencyNAme: string;
    BusType: string;
    DepartureTime: Time;
    ArrivalTime: Time;
    Fare: number;
    NoOfSeats: number;
}

export interface Iaddbus {
    RouteId: number;
    AgencyNAme: string;
    BusType: string;
    DepartureTime: Time;
    ArrivalTime: Time;
    Fare: number;
    NoOfSeats: number;
}

export interface IRoute {
    RouteId: number;
    Source: string;
    Destination: string;
    Distance: number;
}


export interface ITour {
    BusNumber: number;
    AgencyNAme: string;
    Source: string;
    Destination: string;
    BoardingDate: Date;
    DroppingDate: Date;
}