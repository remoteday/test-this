import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'teams'})
export class Team {
  @PrimaryGeneratedColumn()
  @ApiProperty({example: 1})
  id: number;

  @Column({ length: 255 })
  @ApiProperty({example: 'Team 1'})
  name: string;

  @Column({ length: 255 })
  @ApiProperty({example: 'active'})
  status: string;

  @Column({type: 'timestamptz', name: 'created_at'})
  @ApiProperty()
  createdAt: Date;

  @Column({type: 'timestamptz', name: 'updated_at'})
  @ApiProperty()
  updatedAt: Date;
}