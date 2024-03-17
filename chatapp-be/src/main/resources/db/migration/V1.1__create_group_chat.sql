use chat_app;

create table
    group_chat (
        id varchar(40) primary key,
        user_id int not null,
        name varchar(255) not null,
        create_at DATETIME,
        avatar varchar(255),
        FOREIGN KEY (user_id) REFERENCES user (id)
    );

create table
    member (
        id varchar(40) primary key,
        group_id varchar(40) not null,
        user_id int not null,
        foreign key (user_id) references user (id),
        foreign key (group_id) references group_chat(id) on delete cascade
    );

CREATE TABLE
    message_group (
        id varchar(40) primary key,
        type ENUM ('TEXT', 'LINK', 'FILE', 'IMAGE'),
        sender int not null,
        group_id varchar(40) not null,
        create_at datetime not null,
        content text not null,
        foreign key (sender) references user (id),
     
        foreign key (group_id) references group_chat(id) on delete cascade
    );

create table
    last_message_group (
        id varchar(40) primary key,
        message_id varchar(40) not null,
        group_id varchar(40) not null,
        seen bool not null,
        foreign key (message_id) references message_group (id) on delete cascade,
        foreign key (group_id) references group_chat (id) on delete cascade
    );