

use chat_app;

create table user(
    id int primary key auto_increment,
    name varchar(255) not null,
    email varchar(30) not null unique,
    password varchar(100) not null,
    create_at DATETIME ,
    avatar varchar(255) ,
    online bool ,
    enable bool
);

create table conversation(
    id varchar(40) primary key ,
    member1 int not null,
    member2 int not null,
    unique(member1,member2),
    FOREIGN KEY (member1) REFERENCES user(id),
    FOREIGN KEY (member2) REFERENCES user(id)
);


CREATE TABLE message(
    id varchar(40) primary key,
    type ENUM('TEXT','LINK','FILE','IMAGE'),
    sender int not null,
    receiver int not null,
    conversation_id varchar(255) not null,
    create_at datetime not null,
    content text not null,
    foreign key(sender) references user(id),
    foreign key(receiver) references user(id),
    foreign key(conversation_id) references conversation(id) on delete cascade
);




create table friend(
    id int primary key AUTO_INCREMENT,

    sender int not null,

    receiver int not null,

    status enum('PENDING','ACCEPTED') NOT NULL,

    unique(sender,receiver),

    foreign key(sender) references user(id) ,
    foreign key(receiver) references user(id)

);

create table last_message(
    id varchar(40) primary key,

    message_id varchar(40) not null,

    conversation_id varchar(40) not null,

    seen bool not null,

    foreign key(message_id) references message(id) on delete cascade,
    foreign key(conversation_id) references conversation(id) on delete cascade
);