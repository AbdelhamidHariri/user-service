import { query } from "../../lib/db";

export const execute = async () => {
  await query(
    `
    CREATE TABLE users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email varchar(255) NOT NULL,
      first_name varchar(255) NOT NULL,
      last_name varchar(255) NOT NULL,
      password varchar(255) NOT NULL,
      is_first_time_signin BOOLEAN DEFAULT TRUE,
      tc_agreed BOOLEAN NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `
  );
};
