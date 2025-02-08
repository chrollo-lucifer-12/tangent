import {defineConfig} from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({path : ".env"})

export default defineConfig({
    out: './migrations',
    schema: './src/lib/supabase/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        database: "postgres",
        port: 5432,
        host: "aws-0-ap-south-1.pooler.supabase.com",
        user: process.env.DB_USER,
        password: process.env.PW,
    },
});