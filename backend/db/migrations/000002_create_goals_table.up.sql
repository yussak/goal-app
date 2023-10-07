CREATE TABLE IF NOT EXISTS goals (
  id varchar(26) NOT NULL PRIMARY KEY,
  user_id varchar(26) NOT NULL,
  smart_s varchar(50) NOT NULL,
  smart_m varchar(50) NOT NULL,
  smart_a varchar(50) NOT NULL,
  smart_r varchar(50) NOT NULL,
  smart_t varchar(50) NOT NULL,
  purpose varchar(50) NOT NULL,
  loss varchar(50),
  phase varchar(10) NOT NULL DEFAULT '予定',
  progress TINYINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);