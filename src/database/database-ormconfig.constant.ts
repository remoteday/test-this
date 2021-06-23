export function getOrmConfig() {
    let ormConfig;
    const settings = {
        host: process.env.DB_HOSTNAME || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME || 'rdapi',
        password: process.env.DB_PASSWORD || 'supersecret',
        database: process.env.DB_NAME || 'rdapi',
    };

    if (process.env.NODE_ENV !== 'test') {
      ormConfig = {
          type: 'postgres',
          host: settings.host,
          port: settings.port,
          username: settings.username,
          password: settings.password,
          database: settings.database,
          entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
          ],
          logging: true
        };
    } else {
      ormConfig = {
          type: 'postgres',
          host: settings.host,
          port: settings.port,
          username: settings.username,
          password: settings.password,
          database: settings.database,
          entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
          ],
          logging: false
        };
    }
    return ormConfig;
}
