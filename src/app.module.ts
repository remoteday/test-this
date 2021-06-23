import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { DatabaseModule } from './database/database.module';
import { TeamModule } from './team/team.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';

const nodeEnv = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: nodeEnv === 'test' ? '.env.test' : '.env',
    }),
    DatabaseModule,
    RoomModule,
    HealthModule,
    TeamModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
