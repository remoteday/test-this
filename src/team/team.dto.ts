import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CreateTeamDTO {
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;
}

export class UpdateTeamDTO {
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;
}