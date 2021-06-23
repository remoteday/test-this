import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TeamStatus } from "./team.contant";
import { Team } from "./team.entity";
import { TeamFactory } from "./team.factory";
import { TeamService } from "./team.service";

describe('TeamService', () => {
    let service: TeamService;
    let repo: Repository<Team>

    const teamArray = TeamFactory.generateMany(4);
    const oneTeam = TeamFactory.generate();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
              TeamService,
              {
                provide: getRepositoryToken(Team),
                useValue: {
                  findOne: jest.fn().mockResolvedValue(oneTeam),
                  findAndCount: jest.fn().mockResolvedValue(teamArray),
                  save: jest.fn().mockResolvedValue(oneTeam),
                  delete: jest.fn().mockResolvedValue(undefined)
                },
              },
            ],
          }).compile();

          service = module.get<TeamService>(TeamService);
          repo = module.get<Repository<Team>>(getRepositoryToken(Team));
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('#findOne', () => {
        it('returns a team', () => {
            const repoSpy = jest.spyOn(repo, 'findOne');
            expect(service.findOne(1)).resolves.toEqual(oneTeam);
            expect(repoSpy).toBeCalledWith(1);
        });
    });

    describe('#getOne', () => {
        it('returns a team', () => {
            const repoSpy = jest.spyOn(repo, 'findOne');
            expect(service.findOne(1)).resolves.toEqual(oneTeam);
            expect(repoSpy).toBeCalledWith(1);
        });

        it('fails if no team is returned', () => {
            const repoSpy = jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);
            expect(service.getOne(1)).rejects.toThrow('team not found');
            expect(repoSpy).toBeCalledWith(1);
        });
    });

    describe('#create', () => {
        it('creates data', () => {
            const repoSpy = jest.spyOn(repo, 'save');
            expect(service.create({name: oneTeam.name})).resolves.toEqual(oneTeam);
            expect(repoSpy).toBeCalledWith({name: oneTeam.name, status: TeamStatus.ACTIVE});
        });
    });

    describe('#update', () => {
        it('updates data', () => {
            expect(service.update(1, {name: 'new name'})).resolves.toEqual({...oneTeam, name: 'new name', updatedAt: expect.any(Date) });
        });
    });

    describe('#delete', () => {
        it('deletes data', () => {
            expect(service.delete(1)).resolves.toEqual(undefined);
        });
    });
});
