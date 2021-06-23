import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateTeamDTO, UpdateTeamDTO } from './team.dto';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Controller('teams')
@ApiTags('teams')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Get('')
    @ApiQuery({name: 'page', type: 'number', example: 1})
    @ApiQuery({name: 'limit', type: 'number', example: 10})
    list(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ): Promise<Pagination<Team>> {
        return this.teamService.paginate({
            page, limit
        })
    }

    @Get(':id')
    @ApiParam({name: 'id'})
    @ApiOkResponse({type: Team})
    findOne(@Param('id') id) {
        return this.teamService.getOne(id);
    }

    @Post()
    create(@Body() createDto: CreateTeamDTO) {
        return this.teamService.create(createDto)
    }

    @Put(':id')
    @ApiParam({name: 'id'})
    @ApiOkResponse({type: Team})
    update(@Body() updateDto: UpdateTeamDTO, @Param('id') id) {
        return this.teamService.update(id, updateDto);
    }

    @Delete(':id')
    @ApiParam({name: 'id'})
    @ApiNoContentResponse()
    @HttpCode(204)
    delete(@Param('id') id) {
        return this.teamService.delete(id);
    }
}
