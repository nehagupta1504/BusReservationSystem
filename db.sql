create database busReservation

create table customer(
	Id int primary key identity(1,1),
	FirstName varchar(30) not null,
	LastName varchar(30) not null,
	Email varchar(40) not null,
	PhNo varchar(13) not null,
	Password varchar(15) not null,
	Authorised bit not null,
	WalletAmount int not null,
	Dob date,
	Address varchar(100),
	Gender varchar(15)
);

create table admin(
	Id int primary key identity(1,1),
	Email varchar(40) not null,
	Password varchar(15) not null,
);

create table bus(
	BusId int primary key identity(1,1),
	RouteId int foreign key references route(RouteId),
	AgencyNAme varchar(20) not null,
	BusType varchar(15) not null,
	DepartureTime time not null,
	ArrivalTime time not null,
);

create table route(
	RouteId int primary key identity(1,1),
	Source varchar(20) not null,
	Destination varchar(20) not null,
	Distance int not null
);

create table feedback(
CustomerId int foreign key references customer(Id), 
Rating int, 
Comment varchar(100), 
DateOfFeedback datetime
)

create table booking (
BookingId int primary key identity(1,1),
BusId int Foreign key references bus(BusId),
CustomerId int foreign key references customer(Id),
BookingDateTime datetime,
Status varchar(10),
NoOfSeats int,
AmountPaid int,
PaymentMode varchar(20),
Driver bit default 1
)

create table busSeatMap(
BusId int foreign key references bus(BusId),
BoardingDate date not null,
DroppingDate date not null,
S1 bit default 0,
S2 bit default 0,
S3 bit default 0,
S4 bit default 0,
S5 bit default 0,
S6 bit default 0,
S7 bit default 0,
S8 bit default 0,
S9 bit default 0,
S10 bit default 0,
S11 bit default 0,
S12 bit default 0,
S13 bit default 0,
S14 bit default 0,
S15 bit default 0,
S16 bit default 0,
S17 bit default 0,
S18 bit default 0,
S19 bit default 0,
S20 bit default 0,
S21 bit default 0,
S22 bit default 0,
S23 bit default 0,
S24 bit default 0,
)




insert into admin values('admin@gmail.com','root')


insert into customer values('Vartul','Parihar','vartulparihar@gmail.com','+918109597727','12345678',1,2000,'1998/05/27','Mandrem','Male')

insert into route values("","")

insert into admin values("","")

insert into route values ('Gwalior', 'Delhi', 700),
('Chittaranjan', 'Kolkata', 300),
('Madhya Pradesh', 'Kolkata', 1800)

 

select * from bus

 

insert into bus values 

 
(1, 'Sona Travels', 'Non-Ac', '13:30', '22:10'),
(1, 'Vartul Travels', 'Non-Ac', '12:30', '21:10'),
(1, 'Neha Travels', 'Non-Ac', '11:30', '20:10'),
(1, 'Rama Travels', 'Non-Ac', '10:30', '19:10'),
(2, 'Sona Travels', 'AC', '6:30', '15:10'),
(2, 'Vartul Travels', 'AC', '7:30', '16:10'),
(2, 'Neha Travels', 'AC', '8:30', '17:10'),
(2, 'Rama Travels', 'AC', '9:30', '18:10'),
(3, 'Sona Travels', 'Coach', '1:30', '11:10'),
(3, 'Vartul Travels', 'Coach', '3:30', '13:10'),
(3, 'Neha Travels', 'Coach', '6:30', '18:10'),
(3, 'Rama Travels', 'Coach', '8:30', '17:10'),



 

select * from busSeatMap
insert into busSeatMap (BusId, BoardingDate, DroppingDate) values 
(1, '2021-5-1','2021-5-2'),
(2, '2021-6-1','2021-6-2'),
(2, '2021-6-2','2021-6-3'),
(2, '2021-6-3','2021-6-4'),
(3, '2021-4-2','2021-4-3'),
(3, '2021-5-3','2021-5-4'),
(4, '2021-5-2','2021-5-3'),
(4, '2021-6-3','2021-6-4'),
(5, '2021-4-2','2021-4-3'),
(5, '2021-5-3','2021-5-4'),
(6, '2021-5-2','2021-5-3'),
(6, '2021-6-3','2021-6-4'),
(7, '2021-4-13','2021-4-15'),
(7, '2021-5-12','2021-5-14'),
(8, '2021-5-9','2021-5-10'),
(8, '2021-6-18','2021-6-19'),
(9, '2021-4-2','2021-4-4'),
(9, '2021-5-15','2021-5-16'),
(10, '2021-4-21','2021-4-22'),
(10, '2021-5-23','2021-5-24'),
(11, '2021-6-27','2021-6-28'),
(11, '2021-7-3','2021-7-4'),
(12, '2021-4-12','2021-4-13'),
(12, '2021-8-12','2021-8-14')

/*=============================stored procedue for bus search module ==========================*/
create procedure SearchBusesOnFourParameters 
(@src varchar(20), @dest varchar(20), @startDate date, @endDate date)
as
Begin
    select b.BusId as BusNumber, b.AgencyNAme, r.Source, r.Destination, bm.BoardingDate, bm.DroppingDate
    from bus b join route r
    on b.RouteId = r.RouteId
    join busSeatMap bm
    on b.BusId = bm.BusId
    where r.Source=@src and r.Destination=@dest and bm.BoardingDate>=@startDate and bm.DroppingDate<=@endDate
End
exec SearchBusesOnFourParameters 'Chittaranjan', 'Kolkata', '2021-4-13', '2021-6-1'

 


alter procedure SearchBusesOnThreeParameters 
(@src varchar(20), @dest varchar(20), @startDate date)
as
Begin
    select b.BusId as BusNumber, b.AgencyNAme, r.Source, r.Destination, bm.BoardingDate,b.DepartureTime, bm.DroppingDate,b.ArrivalTime
    from bus b join route r
    on b.RouteId = r.RouteId
    join busSeatMap bm
    on b.BusId = bm.BusId
    where r.Source=@src and r.Destination=@dest and bm.BoardingDate=@startDate
End

!--Insert  more data for bus availability

insert into route values ('Indore', 'Pune', 590)



insert into bus values

(4, 'Hans Travels', 'Non-Ac', '22:30', '08:10'),
(4, 'Hans Travels', 'AC', '21:50', '08:10'),
(4, 'Hans Travels', 'Coach', '21:30', '09:10')
select * from bus



insert into busSeatMap (BusId, BoardingDate, DroppingDate) values 
(10, '2021-1-14','2021-1-15'),
(5, '2021-1-14','2021-1-15'),
(13, '2021-1-14','2021-1-15'),
(14, '2021-1-14','2021-1-15'),
(15, '2021-1-14','2021-1-15'),
(9, '2021-1-15','2021-1-16'),
(10, '2021-1-15','2021-1-16'),
(14, '2021-1-15','2021-1-16'),
(13, '2021-1-15','2021-1-16'),
(14, '2021-1-15','2021-1-16')

!-- Added Fare And NoOfSeats To Bus Table XDXD Sorry
!--FIRST ADD FARE AND NOOFSEATS IN BUS TABLE

update bus
set NoOfSeats=24

update bus
set Fare=1000
where RouteId=1

update bus
set Fare=500
where RouteId=2

update bus
set Fare=2100
where RouteId=3

update bus
set Fare=700
where RouteId=4

create procedure GetSeatMapWithFare @id int,@StartDate date
as
select bm.BusId,bm.BoardingDate,bm.DroppingDate,bm.S1,bm.S2,bm.S3,bm.S4,bm.S5,bm.S6,bm.S7,bm.S8,bm.S9,bm.S10,bm.S11,bm.S12,bm.S13,bm.S14,bm.S15,bm.S16,bm.S17,bm.S18,bm.S19,bm.S20,bm.S21,bm.S22,bm.S23,bm.S24,b.Fare
from bus b inner join busSeatMap bm on b.BusId=bm.BusId
where bm.BusId=@id and bm.BoardingDate=@StartDate

exec GetSeatMapWithFare 3,'2021-05-03'

!--   OTP FORGOT PASSWORD

create table otp(
  Email varchar(40) not null,
  Otp int not null
)
insert into otp values('vartulparihar@gmail.com',698)
insert into otp values('sona1998@gmail.com',706)
insert into otp values('NegaG1998@gmail.com',712)
insert into otp values('ramyapennu@gmail.com',720)

create table otpees(
	Email varchar(40) not null,
	Otp int Identity(5789,13) Not Null
)

set Identity_Insert dbo.otpees on

if exists (select * from dbo.otp) insert into dbo.otpees(Email,Otp) select Email,Otp from dbo.otp tablockx

create trigger setotp
on customer
after insert 
as begin

 insert into dbo.otpees(Email) select  i.Email from inserted i
end

!--- Create Procedure For Giving Bus Details to Service Using SP

 

create procedure SearchBusesOnTwoParameters 
(@id int, @boardDate date)
as
Begin
    select b.BusId as BusNumber, b.AgencyNAme, r.Source, r.Destination, bm.BoardingDate, bm.DroppingDate
    from bus b join route r
    on b.RouteId = r.RouteId
    join busSeatMap bm
    on b.BusId = bm.BusId
    where b.BusId=@id and bm.BusId=@id and bm.BoardingDate=@boardDate
End

 

exec SearchBusesOnTwoParameters 13,'2021-01-14'

 

select * from route

!--EDIT FEEDBACK TABLE

alter table feedback
add FeedbackId int primary key identity(101,1)
select * from feedback


!-- Create Procedure To Get All Bus With Route Details For Admin
create procedure GetAllBusWithRouteInfo
as
begin
	select b.BusId,b.RouteId,b.AgencyNAme,b.BusType,r.Source,b.DepartureTime,r.Destination,b.ArrivalTime,b.Fare,b.NoOfSeats
	from bus b inner join route r on b.RouteId=r.RouteId 
end

exec GetAllBusWithRouteInfo

!--CHANGE IN BUSSEATMAP TABLE-- ADD PRIMARY KEY

select * from busSeatMap

drop table busSeatMap

create table busSeatMap(
bsmId int primary key identity(1,1),
BusId int foreign key references bus(BusId),
BoardingDate date not null,
DroppingDate date not null,
S1 bit default 0,
S2 bit default 0,
S3 bit default 0,
S4 bit default 0,
S5 bit default 0,
S6 bit default 0,
S7 bit default 0,
S8 bit default 0,
S9 bit default 0,
S10 bit default 0,
S11 bit default 0,
S12 bit default 0,
S13 bit default 0,
S14 bit default 0,
S15 bit default 0,
S16 bit default 0,
S17 bit default 0,
S18 bit default 0,
S19 bit default 0,
S20 bit default 0,
S21 bit default 0,
S22 bit default 0,
S23 bit default 0,
S24 bit default 0,
)


insert into busSeatMap (BusId, BoardingDate, DroppingDate) values 
(1, '2021-5-1','2021-5-2'),
(2, '2021-6-1','2021-6-2'),
(2, '2021-6-2','2021-6-3'),
(2, '2021-6-3','2021-6-4'),
(3, '2021-4-2','2021-4-3'),
(3, '2021-5-3','2021-5-4'),
(4, '2021-5-2','2021-5-3'),
(4, '2021-6-3','2021-6-4'),
(5, '2021-4-2','2021-4-3'),
(5, '2021-5-3','2021-5-4'),
(6, '2021-5-2','2021-5-3'),
(6, '2021-6-3','2021-6-4'),
(7, '2021-4-13','2021-4-15'),
(7, '2021-5-12','2021-5-14'),
(8, '2021-5-9','2021-5-10'),
(8, '2021-6-18','2021-6-19'),
(9, '2021-4-2','2021-4-4'),
(9, '2021-5-15','2021-5-16'),
(10, '2021-4-21','2021-4-22'),
(10, '2021-5-23','2021-5-24'),
(11, '2021-6-27','2021-6-28'),
(11, '2021-7-3','2021-7-4'),
(12, '2021-4-12','2021-4-13'),
(12, '2021-8-12','2021-8-14')

insert into busSeatMap (BusId, BoardingDate, DroppingDate) values 
(10, '2021-1-14','2021-1-15'),
(5, '2021-1-14','2021-1-15'),
(13, '2021-1-14','2021-1-15'),
(14, '2021-1-14','2021-1-15'),
(15, '2021-1-14','2021-1-15'),
(9, '2021-1-15','2021-1-16'),
(10, '2021-1-15','2021-1-16'),
(14, '2021-1-15','2021-1-16'),
(13, '2021-1-15','2021-1-16'),
(14, '2021-1-15','2021-1-16')

!--new table (custId,BookingId,BussId,BoardingDate,s1,s2,s3...,s23,s24)

select * from CustomerSeatMap


create table CustomerSeatMap (
csmId int primary key identity(1000,1),
customeId int foreign key references customer(Id),
busId int foreign key references bus(BusId),
bookingId int foreign key references booking(BookingId),
boardingDate date not null,
S1 bit default 0,
S2 bit default 0,
S3 bit default 0,
S4 bit default 0,
S5 bit default 0,
S6 bit default 0,
S7 bit default 0,
S8 bit default 0,
S9 bit default 0,
S10 bit default 0,
S11 bit default 0,
S12 bit default 0,
S13 bit default 0,
S14 bit default 0,
S15 bit default 0,
S16 bit default 0,
S17 bit default 0,
S18 bit default 0,
S19 bit default 0,
S20 bit default 0,
S21 bit default 0,
S22 bit default 0,
S23 bit default 0,
S24 bit default 0,
)

select * from booking
select * from CustomerSeatMap
select * from feedback



!----Changes For Date and Datetime conflicts While POST

drop table feedback

create table feedback(
FeedbackId int primary key identity(4444,1),
CustomerId int foreign key references customer(Id), 
Rating int, 
Comment varchar(100), 
DateOfFeedback date
)

select * from CustomerSeatMap
select * from booking

truncate table customer
truncate table CustomerSeatMap
truncate table booking
drop table CustomerSeatMap
drop table booking

create table booking (
BookingId int primary key identity(1,1),
BusId int Foreign key references bus(BusId),
CustomerId int foreign key references customer(Id),
BookingDateTime date,
Status varchar(10),
NoOfSeats int,
AmountPaid int,
PaymentMode varchar(20),
Driver bit default 1
)

create table CustomerSeatMap (
csmId int primary key identity(1000,1),
customeId int foreign key references customer(Id),
busId int foreign key references bus(BusId),
bookingId int foreign key references booking(BookingId),
boardingDate date not null,
S1 bit default 0,
S2 bit default 0,
S3 bit default 0,
S4 bit default 0,
S5 bit default 0,
S6 bit default 0,
S7 bit default 0,
S8 bit default 0,
S9 bit default 0,
S10 bit default 0,
S11 bit default 0,
S12 bit default 0,
S13 bit default 0,
S14 bit default 0,
S15 bit default 0,
S16 bit default 0,
S17 bit default 0,
S18 bit default 0,
S19 bit default 0,
S20 bit default 0,
S21 bit default 0,
S22 bit default 0,
S23 bit default 0,
S24 bit default 0,
)

select * from booking
select * from CustomerSeatMap
select * from busSeatMap
select * from customer


!--STORED PROCEDURE TO GET BOOKING FOR A PARTICULAR ID WITH CUSTOMER SEAT MAP

alter procedure GetBookingWithCSM @bid int
as
begin
	select b.BookingId,b.BusId,b.CustomerId,b.BookingDateTime,b.Status,b.NoOfSeats,
		   b.AmountPaid,b.PaymentMode,b.Driver,c.csmId,c.boardingDate,
		   c.s1,c.s2,c.s3,c.s4,c.s5,c.s6,c.S7,c.S8,c.s9,c.s10,c.s11,c.s12,
		   c.s13,c.s14,c.s15,c.s16,c.s17,c.s18,c.s19,c.s20,c.s21,c.s22,c.s23,c.s24
	from booking b inner join CustomerSeatMap c on b.BookingId=c.bookingId
	where b.BookingId=@bid
end

exec GetBookingWithCSM 2

create procedure GetBookingsForCid @cid int
as
begin
	select b.BookingId,b.BusId,b.CustomerId,b.BookingDateTime,b.Status,b.NoOfSeats,
	b.AmountPaid,b.PaymentMode,b.Driver,csm.boardingDate,r.Source,r.Destination,bus.DepartureTime,bus.ArrivalTime,bus.BusType,bus.AgencyNAme
	from booking b inner join CustomerSeatMap csm on b.BookingId=csm.bookingId inner join bus on b.BusId=bus.BusId inner join route r on bus.RouteId=r.RouteId
	where b.CustomerId=@cid
end

exec GetBookingsForCid 3

!-- PROCEDURE TO GET LATEST BOOKING

ALTER procedure [dbo].[GetLatestBooking]
as
begin
	select top(1) * from booking order by BookingId desc
end


insert into busSeatMap (BusId, BoardingDate, DroppingDate) values 
(1002, '2021-1-14','2021-1-15'),
(3, '2021-1-14','2021-1-15')


