use tax_booking;
create table routes(
route_id INT NOT NULL AUTO_INCREMENT,
origin VARCHAR(100) NOT NULL,
route_password VARCHAR(100) NOT NULL,
distance INT NOT NULL,
duration INT NOT NULL,
PRIMARY KEY (route_id)
);

create table vehicles(
vehicle_id INT NOT NULL AUTO_INCREMENT,
number_plate VARCHAR (50) NOT NULL,
vehicle_type VARCHAR (45) NOT NULL,
total_seates INT NOT NULL,
PRIMARY KEY(vehicle_id)
);

create table drivers(
driver_id INT NOT NULL AUTO_INCREMENT,
driver_name VARCHAR (100) NOT NULL,
licence_number VARCHAR(50) NOT NULL,
phone VARCHAR (20) NOT NULL,
PRIMARY KEY(driver_id)
);

create table driver_assignment(
assignment_id INT NOT NULL AUTO_INCREMENT, 
driver_id INT NOT NULL ,
vehicle_id INT NOT NULL ,
distance INT NOT NULL,
assignment_date DATE NOT NULL,
PRIMARY KEY(assignment_id),
FOREIGN KEY(driver_id) references drivers(driver_id),
FOREIGN KEY(vehicle_id) references vehicles(vehicle_id)
); 


create table seats(
seat_id INT NOT NULL AUTO_INCREMENT,
vehicle_id INT NOT NULL ,
seat_number INT NOT NULL, 
PRIMARY KEY(seat_id),
FOREIGN KEY(vehicle_id) references vehicles(vehicle_id)
);

create table trips(
trip_id INT NOT NULL AUTO_INCREMENT,
route_id INT NOT NULL ,
vehicle_id INT NOT NULL ,
depature_time DATETIME NOT NULL,
arrival_time DATETIME NOT NULL,
price DECIMAL NOT NULL,
PRIMARY KEY(trip_id),
FOREIGN KEY(vehicle_id) references vehicles(vehicle_id),
FOREIGN KEY(route_id) references routes(route_id)
);

create table trip_seat(
trip_seat_id INT NOT NULL AUTO_INCREMENT,
trip_id INT NOT NULL ,
seat_id INT NOT NULL ,
seat_status VARCHAR (20) NOT NULL,
PRIMARY KEY(trip_seat_id),
FOREIGN KEY(trip_id) references trips(trip_id),
FOREIGN KEY(seat_id) references seats(seat_id)
);

create table users(
user_id INT NOT NULL AUTO_INCREMENT,
user_name VARCHAR (100) NOT NULL,
user_password VARCHAR (255)NOT NULL,
email VARCHAR (125) NOT NULL,
phone VARCHAR (20) NOT NULL,
PRIMARY KEY(user_id)
);

create table booking(
booking_id INT NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL ,
trip_seat_id INT NOT NULL ,
booking_date DATETIME NOT NULL,
status VARCHAR (20) NOT NULL,
PRIMARY KEY(booking_id),
FOREIGN KEY(user_id) references users(user_id),
FOREIGN KEY(trip_seat_id) references trip_seat(trip_seat_id)
);

create table payment(
payment_id INT NOT NULL AUTO_INCREMENT,
booking_id INT ,
amount DECIMAL (10,2) NOT NULL,
pay_mothod VARCHAR (20) NOT NULL,
payment_date DATETIME NOT NULL,
PRIMARY KEY(payment_id),
FOREIGN KEY(booking_id) references booking(booking_id)
);








