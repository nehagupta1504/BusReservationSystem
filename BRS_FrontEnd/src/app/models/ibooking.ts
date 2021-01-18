import { EmailValidator } from "@angular/forms";

export interface IBooking {
    busId: number,
    cusId: number,
    email: string,
    boardingDate: Date,
    dateOfBooking: Date,
    status: string,
    noOfSeats: number,
    seatBooked: Boolean[],
    amount_paid: number;
    payment_mode: string,
    driver: boolean;
}
export interface walletUpdate {
    id: number,
    amount: number
}

export interface IFeedback {
    email: string,
    comment: string,
    rating: number,
    dateOfFeedback: Date,

}

export interface Ibook{
    BookingId: number,
    BusId: number,
    CustomerId:number,
    BookingDateTime:Date,
    Status:string,
    NoOfSeats:number,
    AmountPaid:number,
    PaymentMode:string,
    Driver:boolean,

}

