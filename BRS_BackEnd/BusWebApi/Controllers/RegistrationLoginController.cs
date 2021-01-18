using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BusWebApi.Models;
using SocketLabs.InjectionApi;


namespace BusWebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RegistrationLoginController : ApiController
    {
        public int GenerateOtp()
        {
            Random r = new Random();
            return r.Next(1000, 9999);
        }

        public HttpResponseMessage GetAdmin(string email, string password)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var data = db.admins.Where(c => c.Email == email && c.Password == password).FirstOrDefault();
                    if (data == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.OK, "Not Found");



                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, data);
                    }
                }
            }



            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }



        }
        public HttpResponseMessage GetCustomer(string email, string password)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var data = db.customers.Where(c => c.Email == email && c.Password == password && c.Authorised).FirstOrDefault(); // PUT CONDITION FOR AUTHORISED CHANGED ALMOST LAST DATE
                    if (data == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.OK,"Not Found");

                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, data);
                    }
                }
            }

            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            
        }

        [HttpGet]
        public HttpResponseMessage GetCustomer(int id)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var data = db.customers.Where(c => c.Id == id).FirstOrDefault();
                    if (data == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.OK, "Not Found");

                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, data);
                    }

                }
            }

            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            
        }

        public HttpResponseMessage GetOtp(string Email)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var exist = db.customers.Any(c => c.Email == Email);
                    if (exist)
                    {
                        int otp = GenerateOtp();
                        SocketLabsClient.QuickSend(
                        37111, //Your SocketLabs ServerId
                        "b9W2TcSa4i3ZEz67JpYn", //Your Injection API Key
                        Email, //The To address for your message
                        "shaktimaan.gangadhar.shastri@gmail.com", //The From address for your message
                        "Confidential: Do not Share", //The Subject line for your message
                        otp.ToString(), //The HTML content for your message
                        otp.ToString() //The plaintext content for your message
                        );

                        return Request.CreateResponse(HttpStatusCode.OK, otp);
                    }

                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, "Registered Email Not Found");
                    }
                    
                }
            }

            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        public HttpResponseMessage GetCustomer(string email)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var data = db.customers.Where(c => c.Email == email).FirstOrDefault();
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }


        public HttpResponseMessage PostCustomer([FromBody] customer cust)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {
                    var emails = (from c in db.customers select c.Email).ToList();
                    if (emails.Contains(cust.Email))
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, "Email Already in use");
                    }
                    else
                    {
                        db.customers.Add(cust);
                        db.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.Created, cust);
                    }
                }
            }

            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public HttpResponseMessage PutCustomer(int id, [FromBody] customer cust)
        {
            try
            {
                using (busReservationEntities db = new busReservationEntities())
                {

                    var data = db.customers.Find(id);
                    data.FirstName = cust.FirstName;
                    data.LastName = cust.LastName;
                    data.Email = cust.Email;
                    data.PhNo = cust.PhNo;
                    data.Password = cust.Password;
                    data.Dob = cust.Dob;
                    data.Address = cust.Address;
                    data.Gender = cust.Gender;
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
