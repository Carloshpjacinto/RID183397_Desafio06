import 'dotenv/config';
import { DataSource } from 'typeorm';

const dbport:number = Number(process.env.DB_PORT);

export const AppDataSource = new DataSource({

    type: 'postgres',
    host: process.env.DB_HOST,
    port: dbport,
    username: process.env.DB_DNCOMMERCE,
    password: process.env.DB_PASS,
    database: process.env.NAME
});
