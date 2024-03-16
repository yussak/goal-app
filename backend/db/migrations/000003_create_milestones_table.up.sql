CREATE TABLE IF NOT EXISTS milestones (
    id varchar(26) NOT NULL PRIMARY KEY,
    goal_id varchar(26) NOT NULL,
    user_id varchar(26) NOT NULL,
    content varchar(20) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (goal_id) REFERENCES goals(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);