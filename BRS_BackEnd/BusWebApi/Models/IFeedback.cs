using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BusWebApi.Models
{
    public class IFeedback
    {
        public string email { get; set; }
        public string comment { get; set; }
        public int rating { get; set; }
        public DateTime dateOfFeedback { get; set; }
    }
}