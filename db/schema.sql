create database burgers_db;
use burgers_db;

 create table burgers(
 item_id int(6) auto_increment
 ,burger_name varchar(255) not null
 ,devoured boolean not null
 ,primary key (item_id)
 );
 