import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDTO, UpdateTeamDTO } from './team.dto';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';
import { TeamStatus } from './team.contant';

@Injectable()
export class TeamService {
    constructor(@InjectRepository(Team) private readonly teamRepository: Repository<Team>) {}

    findOne(id: number): Promise<Team> {
        return this.teamRepository.findOne(id);
    }

    getOne(id: number): Promise<Team> {
      return this.getOneOrFail(id);
    }

    paginate(options: IPaginationOptions): Promise<Pagination<Team>> {
        return paginate<Team>(this.teamRepository, options);
    }

    async create(payload: CreateTeamDTO) {
        return this.teamRepository.save({...payload, status: TeamStatus.ACTIVE})
    }

    async update(id: number, payload: UpdateTeamDTO) {
       const data = await this.getOne(id);
       data.name = payload.name;
       data.updatedAt = new Date();

      return this.teamRepository.save(data);
    }

    async delete(id: number) {
      await this.getOne(id);
      return this.teamRepository.delete(id);
    }

    protected async getOneOrFail(id: number): Promise<Team> {
      const found = await this.teamRepository.findOne(id);

      if(!found) {
        throw new NotFoundException(`team not found`);
      }

      return found;
    }
}
