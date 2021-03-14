// import PgConf  from './hidden.json';
let PgConf;
export = {
    type: "postgres",
    username: process.env.DATABASE_USERNAME || PgConf.username,
    host: process.env.DATABASE_HOST || PgConf.host,
    database: process.env.DATABASE || PgConf.database,
    password: process.env.PASSWORD_PASSWORD || PgConf.password,
    port: 5432,
    entities: [
        "enties/**/*.ts"
    ],
    ssl: {
        rejectUnauthorized: false
    },
    synchronize: true
}