module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    */

    default: process.env.DB_CONNECTION,

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    */

    connections: {

        mysql: {
            driver: 'mysql',
            connectionLimit: 10,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            charset: 'utf8mb4',
            collation: 'utf8mb4_unicode_ci',
            prefix: '',
        },
    }
};