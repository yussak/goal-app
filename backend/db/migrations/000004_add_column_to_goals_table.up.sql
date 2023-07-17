ALTER TABLE goals
ADD COLUMN user_id varchar(26) NOT NULL,
ADD FOREIGN KEY (user_id) REFERENCES users(id);