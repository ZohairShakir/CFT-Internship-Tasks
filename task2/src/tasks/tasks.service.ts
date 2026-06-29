import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Role } from '../auth/enums/role.enum';

interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
}

@Injectable()
export class TasksService {
  /** In-memory task store */
  private readonly tasks: Task[] = [];

  /**
   * Returns all tasks for Admins.
   * Regular Users receive only the tasks they created.
   */
  findAll(user: AuthenticatedUser): Task[] {
    if (user.role === Role.Admin) {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.userId === user.id);
  }

  /**
   * Creates a new task and assigns it to the requesting user.
   */
  create(dto: CreateTaskDto, user: AuthenticatedUser): Task {
    const task: Task = {
      id: uuidv4(),
      title: dto.title,
      description: dto.description ?? '',
      status: TaskStatus.OPEN,
      createdAt: new Date(),
      userId: user.id,
    };

    this.tasks.push(task);
    return task;
  }

  /**
   * Updates an existing task.
   * - Admins can update any task.
   * - Users can only update their own tasks.
   */
  update(id: string, dto: UpdateTaskDto, user: AuthenticatedUser): Task {
    const task = this.findTaskById(id);

    if (user.role !== Role.Admin && task.userId !== user.id) {
      throw new ForbiddenException('You are not allowed to update this task');
    }

    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.status !== undefined) task.status = dto.status;

    return task;
  }

  /**
   * Deletes a task by ID.
   * Only Admins can delete tasks (enforced at controller level via RolesGuard,
   * but also double-checked here for safety).
   */
  remove(id: string, user: AuthenticatedUser): { message: string } {
    const task = this.findTaskById(id);

    if (user.role !== Role.Admin && task.userId !== user.id) {
      throw new ForbiddenException('You are not allowed to delete this task');
    }

    const index = this.tasks.findIndex((t) => t.id === id);
    this.tasks.splice(index, 1);

    return { message: `Task "${task.title}" has been deleted successfully` };
  }

  /** Internal helper — throws NotFoundException if the task does not exist. */
  private findTaskById(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }
}
