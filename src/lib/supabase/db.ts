import {drizzle} from "drizzle-orm/postgres-js"
import postgres from "postgres";
import * as dotenv from "dotenv"
import * as schema from "../../../migrations/schema"

dotenv.config({path : ".env"});

if (!process.env.DATABASE_URL) {
    console.log('🔴 no database URL');
}

const client = postgres(process.env.DATABASE_URL as string, {max : 5});

const db = drizzle(client,{schema});

export default db