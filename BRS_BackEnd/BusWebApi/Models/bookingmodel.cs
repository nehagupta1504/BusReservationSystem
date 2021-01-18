using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BusWebApi.Models
{
    public class bookingmodel
    {
        public int busId { get; set; }
        public int cusId{ get; set; }
        public string email { get; set; }
        public DateTime boardingDate { get; set; }
        public DateTime dateofBooking { get; set; }
        public string status { get; set; }
        public int noOfSeats { get; set; }
        public bool[] seatBooked { get; set; }
        public int amount_paid { get; set; }
        public string payment_mode { get; set; }
        public bool driver { get; set; }
    }
}