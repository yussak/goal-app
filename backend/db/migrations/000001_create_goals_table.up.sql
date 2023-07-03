-- TODO:goalじゃなくgoalsが正しいと思うのでロールバックして変更予定
CREATE TABLE IF NOT EXISTS goal (
  -- TODO: 	id varchar(26) not null PRIMARY KEY,にロールバックして変更する
  	id varchar(26) not null,
    title varchar(50) not null,
    -- TODO: varcharじゃなくTEXT型に変更予定
    text varchar(100) not null
);