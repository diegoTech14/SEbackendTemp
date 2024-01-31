import { createPool } from "mysql2/promise";
import { DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USER } from "./config.js";

//The object for connect the database will take the enviroment variables 
export const pool = createPool({
    host:DB_HOST,
    user:DB_NAME,
    password:DB_PASSWORD,
    port:DB_PORT,
    database:DB_USER, 
})
