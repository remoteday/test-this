import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRoomsTable1604291274688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
            CREATE TABLE rooms (
                id SERIAL,
                name VARCHAR (255) NOT NULL,
                status VARCHAR (255) NOT NULL,
                team_id INT NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                PRIMARY KEY (id),
                FOREIGN KEY (team_id) REFERENCES teams (id)
            );
        `;
        queryRunner.query(query);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const query = `
            DROP TABLE rooms;
        `;
        queryRunner.query(query);
    }

}
