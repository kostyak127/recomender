CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
create table "project" (
    id uuid default uuid_generate_v4() not null
        constraint project_pkey
            primary key,
    "name" varchar(30) not null,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);

create table "user" (
    id varchar(30) not null
        constraint user_pkey
            primary key,
    external_id varchar(30) not null,
    project_id uuid
        constraint user_project_id_fk
            references project,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);
CREATE INDEX user_external_id_idx ON table "user" USING HASH (external_id);

create table "meal" (
    id varchar(30) not null
            constraint meal_pkey
                primary key,
    external_id varchar(30) not null,
    project_id uuid
        constraint meal_project_id_fk
            references project,
    "name" varchar(30) default null,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);
CREATE INDEX meal_external_id_idx ON table "meal" USING HASH (external_id);

create table "rating" (
    id varchar(30) not null
        constraint rating_pkey
            primary key,
    meal_id varchar(30)
        constraint rating_meal_id_fk
                references meal,
    day_part varchar(15) not null,
    "month" varchar (15) not null,
    "rank" integer not null,
    "ordered_times" integer not null,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);

#DOWN

drop table "rating";
drop table "meal";
drop table "user";
drop table "project";