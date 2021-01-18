create database busReservation

use busReservation



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


insert into route values ('Gwalior', 'Delhi', 700),
('Chittaranjan', 'Kolkata', 300),
('Madhya Pradesh', 'Kolkata', 1800)

select * from bus

insert into bus values 

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
(3, 'Rama Travels', 'Coach', '8:30', '17:10')

select * from busSeatMap
insert into busSeatMap (BusId, BoardingDate, DroppingDate) values 

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


insert into admin values('admin@gmail.com','root')

 
use busReservation

insert into customer values('Vartul','Parihar','vartulparihar@gmail.com','+918109597727','12345678',1,2000,'1998/05/27','Mandrem','Male')


select bus.BusId, bus.AgencyNAme, route.RouteId, route.Source, route.Destination, busSeatMap.BoardingDate
from bus join route
on bus.RouteId = route.RouteId
join busSeatMap
on bus.BusId = busSeatMap.BusId
where route.Source = 'Gwalior' and route.Destination='Delhi' and busSeatMap.BoardingDate >= '2021-6-1'

select * from busSeatMap

/*=============================stored procedue for bus search module ==========================*/
alter procedure SearchBusesOnFourParameters 
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

use busReservation
create procedure SearchBusesOnThreeParameters 
(@src varchar(20), @dest varchar(20), @startDate date)
as
Begin
	select b.BusId as BusNumber, b.AgencyNAme, r.Source, r.Destination, bm.BoardingDate, bm.DroppingDate
	from bus b join route r
	on b.RouteId = r.RouteId
	join busSeatMap bm
	on b.BusId = bm.BusId
	where r.Source=@src and r.Destination=@dest and bm.BoardingDate>=@startDate
End

exec SearchBusesOnThreeParameters 'Chittaranjan', 'Kolkata', '2021-4-13'


select * from customer