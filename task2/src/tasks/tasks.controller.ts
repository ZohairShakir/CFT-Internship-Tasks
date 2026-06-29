import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import type { Task } from './interfaces/task.interface';

@Controller('tasks')
@UseGuards(JwtAuthGuard) // All task routes require a valid JWT
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * GET /tasks
   * Admins receive all tasks; Users receive only their own.
   */
  @Get()
  findAll(@Req() req: any): Task[] {
    return this.tasksService.findAll(req.user);
  }

  /**
   * POST /tasks
   * Any authenticated user can create a task.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTaskDto, @Req() req: any): Task {
    return this.tasksService.create(dto, req.user);
  }

  /**
   * PATCH /tasks/:id
   * Admins can update any task; Users can only update their own.
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @Req() req: any,
  ): Task {
    return this.tasksService.update(id, dto, req.user);
  }

  /**
   * DELETE /tasks/:id
   * Restricted to Admin role only via @Roles + RolesGuard.
   */
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string, @Req() req: any): { message: string } {
    return this.tasksService.remove(id, req.user);
  }
}
