CREATE TABLE IF NOT EXISTS goals (
  id varchar(26) NOT NULL PRIMARY KEY,
  user_id varchar(26) NOT NULL,
  smart_specific varchar(50) NOT NULL,
  smart_measurable varchar(50) NOT NULL,
  smart_achievable varchar(50) NOT NULL,
  smart_relevant varchar(50) NOT NULL,
  smart_time_bound varchar(50) NOT NULL,
  purpose varchar(50) NOT NULL,
  loss varchar(50),
  phase varchar(10) NOT NULL DEFAULT '予定',
  progress TINYINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);