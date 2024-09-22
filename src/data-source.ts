import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User.js"
import { Task } from "./models/Task.js"
import 'dotenv/config'
const isDocker = process.env.DOCKER === 'true';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: isDocker ? 'db' : 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD ,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: false,
    entities: [User, Task],
    migrations: ["dist/migrations/*.js"],
    subscribers: [],
})