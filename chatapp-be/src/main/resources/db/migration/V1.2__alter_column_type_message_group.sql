use chat_app;
alter table message_group 
modify column type  ENUM ('TEXT', 'LINK', 'FILE', 'IMAGE', 'NOTIFICATION') not null