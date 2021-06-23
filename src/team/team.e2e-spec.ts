import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TeamStatus } from './team.contant';
import { TestUtils } from '../../test/test.utils';
import { DatabaseModule } from '../database/database.module';

describe('TeamController (e2e)', () => {
  let app: INestApplication;
  let teamRepository: Repository<Team>;
  let testUtils: TestUtils;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [TestUtils]
    }).compile();

    app = module.createNestApplication();

    await app.init();
    testUtils = module.get<TestUtils>(TestUtils)
    teamRepository = module.get<Repository<Team>>(getRepositoryToken(Team));
  });

  afterEach(async () => {
    await teamRepository.delete({})
    await testUtils.closeDbConnection()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/teams/{id} (GET)', async () => {
    const team = await teamRepository.save({name: 'team 1', status: TeamStatus.ACTIVE});

    const { body } = await request(app.getHttpServer())
      .get(`/teams/${team.id}`)
      .expect(200)

    expect(body).toEqual({...team, createdAt: expect.any(String), updatedAt: expect.any(String)});

  });
});
