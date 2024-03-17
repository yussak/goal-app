CREATE TABLE IF NOT EXISTS goals (
  id varchar(26) NOT NULL PRIMARY KEY,
  user_id varchar(26) NOT NULL,
  content varchar(100) NOT NULL,
  purpose varchar(50),
  benefit varchar(50),
  phase varchar(10) NOT NULL DEFAULT 'plan',
  progress TINYINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);