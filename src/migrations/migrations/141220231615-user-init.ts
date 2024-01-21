import { query } from "../../lib/db";

export const execute = async () => {
  await query(
    `
    CREATE TABLE users (
      email varchar(255) PRIMARY KEY,
      first_name varchar(255) NOT NULL,
      last_name varchar(255) NOT NULL,
      password varchar(255) NOT NULL,
      salt varchar(255) NOT NULL,
      is_first_time_signin BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `
  );
};
