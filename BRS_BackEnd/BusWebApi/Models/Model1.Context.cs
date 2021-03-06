﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BusWebApi.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class busReservationEntities : DbContext
    {
        public busReservationEntities()
            : base("name=busReservationEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<admin> admins { get; set; }
        public DbSet<booking> bookings { get; set; }
        public DbSet<bus> buses { get; set; }
        public DbSet<busSeatMap> busSeatMaps { get; set; }
        public DbSet<customer> customers { get; set; }
        public DbSet<route> routes { get; set; }
        public DbSet<CustomerSeatMap> CustomerSeatMaps { get; set; }
        public DbSet<feedback> feedbacks { get; set; }
    
        public ObjectResult<GetAllBusWithRouteInfo_Result> GetAllBusWithRouteInfo()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetAllBusWithRouteInfo_Result>("GetAllBusWithRouteInfo");
        }
    
        public ObjectResult<GetSeatMapWithFare_Result> GetSeatMapWithFare(Nullable<int> id, Nullable<System.DateTime> startDate)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("id", id) :
                new ObjectParameter("id", typeof(int));
    
            var startDateParameter = startDate.HasValue ?
                new ObjectParameter("StartDate", startDate) :
                new ObjectParameter("StartDate", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetSeatMapWithFare_Result>("GetSeatMapWithFare", idParameter, startDateParameter);
        }
    
        public ObjectResult<SearchBusesOnThreeParameters_Result> SearchBusesOnThreeParameters(string src, string dest, Nullable<System.DateTime> startDate)
        {
            var srcParameter = src != null ?
                new ObjectParameter("src", src) :
                new ObjectParameter("src", typeof(string));
    
            var destParameter = dest != null ?
                new ObjectParameter("dest", dest) :
                new ObjectParameter("dest", typeof(string));
    
            var startDateParameter = startDate.HasValue ?
                new ObjectParameter("startDate", startDate) :
                new ObjectParameter("startDate", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<SearchBusesOnThreeParameters_Result>("SearchBusesOnThreeParameters", srcParameter, destParameter, startDateParameter);
        }
    
        public ObjectResult<SearchBusesOnTwoParameters_Result> SearchBusesOnTwoParameters(Nullable<int> id, Nullable<System.DateTime> boardDate)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("id", id) :
                new ObjectParameter("id", typeof(int));
    
            var boardDateParameter = boardDate.HasValue ?
                new ObjectParameter("boardDate", boardDate) :
                new ObjectParameter("boardDate", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<SearchBusesOnTwoParameters_Result>("SearchBusesOnTwoParameters", idParameter, boardDateParameter);
        }
    
        public ObjectResult<GetLatestBooking_Result> GetLatestBooking()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetLatestBooking_Result>("GetLatestBooking");
        }
    
        public ObjectResult<GetBookingWithCSM_Result> GetBookingWithCSM(Nullable<int> bid)
        {
            var bidParameter = bid.HasValue ?
                new ObjectParameter("bid", bid) :
                new ObjectParameter("bid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetBookingWithCSM_Result>("GetBookingWithCSM", bidParameter);
        }
    
        public ObjectResult<GetBookingsForCid_Result> GetBookingsForCid(Nullable<int> cid)
        {
            var cidParameter = cid.HasValue ?
                new ObjectParameter("cid", cid) :
                new ObjectParameter("cid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetBookingsForCid_Result>("GetBookingsForCid", cidParameter);
        }
    }
}
