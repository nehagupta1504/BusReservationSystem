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
    public class BusAvailabilityController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Search(string src, string dest, DateTime startDate)
        {
            using (busReservationEntities db = new busReservationEntities())
            {
                var data = db.SearchBusesOnThreeParameters(src, dest, startDate).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
        }

        [HttpGet]
        public HttpResponseMessage SearchByTwo(int id, DateTime startDate)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var data = db.SearchBusesOnTwoParameters(id, startDate).FirstOrDefault();
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }

            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            
        }

        public HttpResponseMessage GetBus()
        {
            using (busReservationEntities db = new busReservationEntities())
            {
                var data = db.buses.ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
        }
    }
}
