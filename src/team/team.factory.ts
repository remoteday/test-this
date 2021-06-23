import { createFactory } from 'faker-create-factory';
import { TeamStatus } from './team.contant';
import { Team } from "./team.entity";

export const TeamFactory = createFactory<Team>(faker => ({
    id: faker.random.number(),
    name: faker.random.word(),
    status: TeamStatus.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date()
}));