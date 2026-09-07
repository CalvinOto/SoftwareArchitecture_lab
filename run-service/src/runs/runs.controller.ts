import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RunsService } from './runs.service';
import { CreateRunDto } from './dto/create-run.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';

@ApiTags('Runs')
@Controller()
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get('runs/:id/category')
  @ApiOperation({ summary: 'Get all accepted runs by category' })
  @ApiResponse({ status: 200, description: 'Returns list of accepted runs' })
  async findByCategory(@Param('id') id: string) {
    return this.runsService.findByCategory(id);
  }

  @Get('runs/:id/user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all runs by user (authenticated)' })
  @ApiResponse({ status: 200, description: 'Returns list of runs by user' })
  async findByUser(@Param('id') id: string, @Request() req) {
    return this.runsService.findByUser(id, req.user.id);
  }

  @Get('runs/:id')
  @ApiOperation({ summary: 'Get run details' })
  @ApiResponse({ status: 200, description: 'Returns run details' })
  @ApiResponse({ status: 404, description: 'Run not found' })
  async findOne(@Param('id') id: string) {
    return this.runsService.findOne(id);
  }

  @Post('runs')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit a new run (authenticated)' })
  @ApiResponse({ status: 201, description: 'Run submitted successfully' })
  async create(@Body() dto: CreateRunDto, @Request() req) {
    return this.runsService.create(dto, req.user.id);
  }

  @Get('admin/runs/:status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all runs by status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Returns list of runs filtered by status' })
  async findByStatus(@Param('status') status: string) {
    return this.runsService.findByStatus(status);
  }

  @Post('admin/runs/:id/accept')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Accept a run (Admin only)' })
  @ApiResponse({ status: 200, description: 'Run accepted successfully' })
  async accept(@Param('id') id: string) {
    return this.runsService.accept(id);
  }

  @Post('admin/runs/:id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reject a run (Admin only)' })
  @ApiResponse({ status: 200, description: 'Run rejected successfully' })
  async reject(@Param('id') id: string) {
    return this.runsService.reject(id);
  }
}