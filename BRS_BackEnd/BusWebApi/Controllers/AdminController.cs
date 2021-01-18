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
    public class AdminController : ApiController
    {
        public HttpResponseMessage PostBus([FromBody] bus busadd)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var routeid = (from c in db.routes select c.RouteId).ToList();
                    if (routeid.Contains(Convert.ToInt32(busadd.RouteId)))
                    {
                        db.buses.Add(busadd);
                        db.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.Created, busadd);
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, "bus with this route is not present");

                    }
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
                    var data = db.buses.Where(b => b.BusId == BusId).FirstOrDefault();
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            
        }

        [HttpGet]
        public HttpResponseMessage GetAllBusesWithRouteInfo()
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var data = db.GetAllBusWithRouteInfo().ToList();
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public HttpResponseMessage PutBus(int id, [FromBody] bus buss)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {

                    var data = db.buses.Find(id);
                    data.AgencyNAme = buss.AgencyNAme;
                    data.BusType = buss.BusType;
                    data.DepartureTime = buss.DepartureTime;
                    data.ArrivalTime = buss.ArrivalTime;
                    data.Fare = buss.Fare;
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }

            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        public HttpResponseMessage GetAllRoute()
        {
          
            using (busReservationEntities db = new busReservationEntities())
            {
                var data = db.routes.ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
        }
        public HttpResponseMessage GetRoute(int routeid)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var data = db.routes.Find(routeid);
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            
        }

        public HttpResponseMessage PutRoute(int id, [FromBody] route rout)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {

                    var data = db.routes.Find(id);
                    data.Source = rout.Source;
                    data.Destination = rout.Destination;
                    data.Distance = rout.Distance;

                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }

            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

    }
}