import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

const {
  DB_PORT,
  DB_USERNAME,
  DB_HOSTNAME,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

const ormconfig: TypeOrmModuleOptions | ConnectionOptions =  {
  type: 'postgres',
  host: DB_HOSTNAME || 'localhost',
  port: parseInt(DB_PORT || '5432', 10),
  username: DB_USERNAME || 'rdapi',
  password: DB_PASSWORD || 'supersecret',
  database: DB_NAME || 'rdapi',
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
  ],
  logging: true,
  keepConnectionAlive: true,
};

module.exports = ormconfig;
