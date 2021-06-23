import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamController } from './team.controller';
import { Team } from './team.entity';
import { TeamFactory } from './team.factory';
import { TeamService } from './team.service';

describe('TeamController', () => {
  let teamController: TeamController;
  let teamService: TeamService;
  let teamRepository: Repository<Team>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        TeamService,
        {
          provide: getRepositoryToken(Team),
          useValue: {
            findOne: jest.fn(),
            findAndCount: jest.fn(),
            save: jest.fn(),
            delete: jest.fn()
          },
        },
      ],
    }).compile();

    teamController = module.get<TeamController>(TeamController);
    teamService = module.get<TeamService>(TeamService);
    teamRepository = module.get<Repository<Team>>(getRepositoryToken(Team));
  });

  it('should be defined', () => {
    expect(teamController).toBeDefined();
});

  describe('findOne', () => {
    it('returns a team', () => {
      const team = TeamFactory.generate();
      jest.spyOn(teamService, 'getOne').mockResolvedValue(team);
      expect(teamController.findOne(1)).resolves.toBe(team);
      expect(teamService.getOne).toBeCalledWith(1)
    });

    it('throws an error if team is not found', () => {
      jest.spyOn(teamRepository, 'findOne').mockResolvedValue(undefined);
      expect(teamController.findOne(1)).rejects.toThrowError(new NotFoundException('team not found'));
    })
  })

  describe('delete', () => {
    it('deletes a team', () => {
      jest.spyOn(teamService, 'delete').mockResolvedValue(null);
      expect(teamController.delete(1)).resolves.toBeNull();
    });

    it('throws an error if team is not found', () => {
      jest.spyOn(teamRepository, 'findOne').mockResolvedValue(undefined);
      expect(teamController.delete(1)).rejects.toThrowError(new NotFoundException('team not found'));
    })
  })
});
