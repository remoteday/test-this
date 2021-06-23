const {
    DB_PORT,
    DB_USERNAME,
    DB_HOSTNAME,
    DB_PASSWORD,
    DB_NAME,
} = process.env;
  
module.exports = {
    type: 'postgres',
    host: DB_HOSTNAME || 'localhost',
    port: parseInt(DB_PORT || '5432', 10),
    username: DB_USERNAME || 'rdapi',
    password: DB_PASSWORD || 'supersecret',
    database: DB_NAME || 'rdapi',
    entities: [],
    logging: true,
    keepConnectionAlive: true,
    migrationsTableName: 'migrations',
    migrations: ['migrations/*.ts'],
    cli: {
      migrationsDir: 'migrations',
    }
};