import pgPromise from "pg-promise";
import dotenv from 'dotenv';
dotenv.config();


const db = pgPromise()({
  connectionString: process.env.DATABASE_URL,
});
console.log("Database URL:", process.env.DATABASE_URL);

export default db;
