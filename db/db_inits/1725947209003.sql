begin transaction;

create table t (
    id integer primary key autoincrement ,
    name text not null unique,
    email text not null unique ,
    password_hashed text not null ,
    description text not null default '',
    icon blob
);

insert into t (id, name, email, password_hashed) select * from users;

drop table users;

alter table t rename to users;

commit;