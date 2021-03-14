// import PgConf  from './hidden.json';
export = {
    type: "postgres",
    username: process.env.DATABASE_USERNAME ,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD_PASSWORD,
    port: 5432,
    entities: [
        "enties/**/*.ts"
    ],
    ssl: {
        rejectUnauthorized: false
    },
    synchronize: true
}