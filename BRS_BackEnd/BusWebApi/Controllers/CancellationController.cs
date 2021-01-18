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
    public class CancellationController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage GetAllBookings(int cusId)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {

                    var data = db.GetBookingsForCid(cusId).ToList();
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }

            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetBooking(int id)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var data = db.bookings.Find(id);
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }

            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        public HttpResponseMessage CancelBooking(int id)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var ticket = db.bookings.Find(id);
                    var csm = db.CustomerSeatMaps.Where(c => c.bookingId == id).FirstOrDefault();
                    var bsm = db.busSeatMaps.Where(b => b.BusId == ticket.BusId && b.BoardingDate == csm.boardingDate).FirstOrDefault();
                    var cust = db.customers.Find(csm.customeId);
                    
                    bsm.S1 = csm.S1==true ? false : bsm.S1;
                    bsm.S2 = csm.S2 == true ? false : bsm.S2;
                    bsm.S3 = csm.S3 == true ? false : bsm.S3;
                    bsm.S4 = csm.S4 == true ? false : bsm.S4;
                    bsm.S5 = csm.S5 == true ? false : bsm.S5;
                    bsm.S6 = csm.S6 == true ? false : bsm.S6;
                    bsm.S7 = csm.S7 == true ? false : bsm.S7;
                    bsm.S8 = csm.S8 == true ? false : bsm.S8;
                    bsm.S9 = csm.S9 == true ? false : bsm.S9;
                    bsm.S10 = csm.S10 == true ? false : bsm.S10;
                    bsm.S11 = csm.S11 == true ? false : bsm.S11;
                    bsm.S12 = csm.S12 == true ? false : bsm.S12;
                    bsm.S13 = csm.S13 == true ? false : bsm.S13;
                    bsm.S14 = csm.S14 == true ? false : bsm.S14;
                    bsm.S15 = csm.S15 == true ? false : bsm.S15;
                    bsm.S16 = csm.S16 == true ? false : bsm.S16;
                    bsm.S17 = csm.S17 == true ? false : bsm.S17;
                    bsm.S18 = csm.S18 == true ? false : bsm.S18;
                    bsm.S19 = csm.S19 == true ? false : bsm.S19;
                    bsm.S20 = csm.S20 == true ? false : bsm.S20;
                    bsm.S21 = csm.S21 == true ? false : bsm.S21;
                    bsm.S22 = csm.S22 == true ? false : bsm.S22;
                    bsm.S23 = csm.S23 == true ? false : bsm.S23;
                    bsm.S24 = csm.S24 == true ? false : bsm.S24;

                    if (ticket.PaymentMode == "wallet") { cust.WalletAmount += (int)ticket.AmountPaid; }

                    //CHANGES TO DATABASE
                    db.CustomerSeatMaps.Remove(csm);
                    ticket.Status = "CANCELLED";
                    db.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK, "Deleted");


                }
            }

            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
