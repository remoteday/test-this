import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTeamsTable1604290382394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
            CREATE TABLE teams (
                id SERIAL,
                name VARCHAR (255) NOT NULL,
                status VARCHAR (255) NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                PRIMARY KEY (id)
            );
        `;
        queryRunner.query(query);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const query = `
            DROP TABLE teams;
        `;
        queryRunner.query(query);
    }

}
