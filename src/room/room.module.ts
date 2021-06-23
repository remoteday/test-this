import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import {RoomController} from './room.controller';

@Module({
  imports: [],
  controllers: [RoomController],
  providers: [RoomService],
})

export class RoomModule {}
