import { createPool } from "mysql2/promise";
import { DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USER } from "./config.js";

//The object for connect the database will take the enviroment variables 
export const pool = createPool({
    host:"b5l6mh6wvrjr2jq8i8go-mysql.services.clever-cloud.com",
    user:"u5aezsynco99udpq",
    password:"mD6k90WBt3XfYiDaD2pa",
    port:3306,
    database:"b5l6mh6wvrjr2jq8i8go", 
})
