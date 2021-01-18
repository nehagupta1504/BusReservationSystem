using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BusWebApi.Models;

namespace BusWebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ReservationController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage GetSeatMap(int BusId,DateTime BoardDate)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var seatmap = db.busSeatMaps.Where(b => b.BusId == BusId && b.BoardingDate == BoardDate).FirstOrDefault();
                    return Request.CreateResponse(HttpStatusCode.OK, seatmap);
                }
            }

            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetBus(int BusId)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var bus = db.buses.Where(b => b.BusId == BusId).FirstOrDefault();
                    return Request.CreateResponse(HttpStatusCode.OK, bus);
                }
            }

            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetSeatMapWithFare(int BusId, DateTime BoardDate)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var data = db.GetSeatMapWithFare(BusId, BoardDate).FirstOrDefault();
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }

            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetWalletAmount(int CustId)
        {
            try
            {
                using(busReservationEntities db = new busReservationEntities())
                {
                    var data = db.customers.Find(CustId).WalletAmount;
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        public HttpResponseMessage PutWalletAmount(int CustId,int amount)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var data = db.customers.Find(CustId);
                    data.WalletAmount = amount;
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        public HttpResponseMessage PostBooking([FromBody] bookingmodel obj)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var cust = db.customers.Where(c => c.Email == obj.email).FirstOrDefault();
                    

                    booking booked = new booking();
                    booked.BusId = obj.busId;
                    booked.CustomerId = cust.Id;
                    booked.BookingDateTime = DateTime.Now;
                    booked.Status = obj.status;
                    booked.NoOfSeats = obj.noOfSeats;
                    booked.AmountPaid = obj.amount_paid;
                    booked.PaymentMode = obj.payment_mode;
                    booked.Driver = obj.driver;

                    if (obj.payment_mode == "wallet")
                    {
                        cust.WalletAmount -= obj.amount_paid;
                    }

                    //PUT SEAT DATA IN BUS SEAT MAP TABLE
                    var bsm = db.busSeatMaps.Where(sm => sm.BusId == obj.busId && sm.BoardingDate == obj.boardingDate).FirstOrDefault();

                    bsm.S1 = bsm.S1 == false && obj.seatBooked[1] ? obj.seatBooked[1] : bsm.S1;
                    bsm.S2  = bsm.S2  == false && obj.seatBooked[2]  ? obj.seatBooked[2]  : bsm.S2 ;
                    bsm.S3  = bsm.S3  == false && obj.seatBooked[3]  ? obj.seatBooked[3]  : bsm.S3 ;
                    bsm.S4  = bsm.S4  == false && obj.seatBooked[4]  ? obj.seatBooked[4]  : bsm.S4 ;
                    bsm.S5  = bsm.S5  == false && obj.seatBooked[5]  ? obj.seatBooked[5]  : bsm.S5 ;
                    bsm.S6  = bsm.S6  == false && obj.seatBooked[6]  ? obj.seatBooked[6]  : bsm.S6;
                    bsm.S7  = bsm.S7  == false && obj.seatBooked[7]  ? obj.seatBooked[7]  : bsm.S7;
                    bsm.S8  = bsm.S8  == false && obj.seatBooked[8]  ? obj.seatBooked[8]  : bsm.S8 ;
                    bsm.S9  = bsm.S9  == false && obj.seatBooked[9]  ? obj.seatBooked[9]  : bsm.S9 ;
                    bsm.S10 = bsm.S10 == false && obj.seatBooked[10] ? obj.seatBooked[10] : bsm.S10 ;
                    bsm.S11 = bsm.S11 == false && obj.seatBooked[11] ? obj.seatBooked[11] : bsm.S11 ;
                    bsm.S12 = bsm.S12 == false && obj.seatBooked[12] ? obj.seatBooked[12] : bsm.S12 ;
                    bsm.S13 = bsm.S13 == false && obj.seatBooked[13] ? obj.seatBooked[13] : bsm.S13 ;
                    bsm.S14 = bsm.S14 == false && obj.seatBooked[14] ? obj.seatBooked[14] : bsm.S14 ;
                    bsm.S15 = bsm.S15 == false && obj.seatBooked[15] ? obj.seatBooked[15] : bsm.S15 ;
                    bsm.S16 = bsm.S16 == false && obj.seatBooked[16] ? obj.seatBooked[16] : bsm.S16 ;
                    bsm.S17 = bsm.S17 == false && obj.seatBooked[17] ? obj.seatBooked[17] : bsm.S17 ;
                    bsm.S18 = bsm.S18 == false && obj.seatBooked[18] ? obj.seatBooked[18] : bsm.S18 ;
                    bsm.S19 = bsm.S19 == false && obj.seatBooked[19] ? obj.seatBooked[19] : bsm.S10 ;
                    bsm.S20 = bsm.S20 == false && obj.seatBooked[20] ? obj.seatBooked[20] : bsm.S20 ;
                    bsm.S21 = bsm.S21 == false && obj.seatBooked[21] ? obj.seatBooked[21] : bsm.S21 ;
                    bsm.S22 = bsm.S22 == false && obj.seatBooked[22] ? obj.seatBooked[22] : bsm.S22 ;
                    bsm.S23 = bsm.S23 == false && obj.seatBooked[23] ? obj.seatBooked[23] : bsm.S23 ;
                    bsm.S24 = bsm.S24 == false && obj.seatBooked[24] ? obj.seatBooked[24] : bsm.S24 ;
                    

                    //SAVE CHANGES TO DATABASE
                    db.bookings.Add(booked);
                    db.SaveChanges();

                    //PUT DATA INT CUSTOMER SEAT MAP TABLE
                    CustomerSeatMap csm = new CustomerSeatMap();
                    //var ticket = Json(from d in db.bookings orderby d.BookingId descending select new booking()).Take(1).FirstOrDefault();
                    //DIDNT WORK--Cannot SERIALIZE EXCEPTION
                    //db.bookings.Last(); // DIDNT WORK-- Last Not Allowed
                    var ticket = db.GetLatestBooking().FirstOrDefault();

                    csm.customeId = cust.Id;
                    csm.busId = obj.busId;
                    csm.bookingId = ticket.BookingId;
                    csm.boardingDate = obj.boardingDate;
                    csm.S1  = obj.seatBooked[1];
                    csm.S2  = obj.seatBooked[2];
                    csm.S3  = obj.seatBooked[3];
                    csm.S4  = obj.seatBooked[4];
                    csm.S5  = obj.seatBooked[5];
                    csm.S6  = obj.seatBooked[6];
                    csm.S7  = obj.seatBooked[7];
                    csm.S8  = obj.seatBooked[8];
                    csm.S9  = obj.seatBooked[9];
                    csm.S10 = obj.seatBooked[10];
                    csm.S11 = obj.seatBooked[11];
                    csm.S12 = obj.seatBooked[12];
                    csm.S13 = obj.seatBooked[13];
                    csm.S14 = obj.seatBooked[14];
                    csm.S15 = obj.seatBooked[15];
                    csm.S16 = obj.seatBooked[16];
                    csm.S17 = obj.seatBooked[17];
                    csm.S18 = obj.seatBooked[18];
                    csm.S19 = obj.seatBooked[19];
                    csm.S20 = obj.seatBooked[20];
                    csm.S21 = obj.seatBooked[21];
                    csm.S22 = obj.seatBooked[22];
                    csm.S23 = obj.seatBooked[23];
                    csm.S24 = obj.seatBooked[24];

                    db.CustomerSeatMaps.Add(csm);
                    db.SaveChanges();


                    return Request.CreateResponse(HttpStatusCode.OK,booked);

                }
            }

            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPost]
        public HttpResponseMessage PostFeedback([FromBody] IFeedback fdbc) 
        {
            try
            {
                using(busReservationEntities db = new busReservationEntities())
                {
                    var cust = db.customers.Where(c => c.Email == fdbc.email).FirstOrDefault();
                    feedback feed = new feedback();

                    feed.CustomerId = cust.Id;
                    feed.Rating =fdbc.rating;
                    feed.Comment =fdbc.comment;
                    feed.DateOfFeedback = DateTime.Now;

                    db.feedbacks.Add(feed);
                    db.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.Created,"Created");
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        

    }
}
