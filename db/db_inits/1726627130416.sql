begin transaction;

alter table users add column icon_type text;

commit;