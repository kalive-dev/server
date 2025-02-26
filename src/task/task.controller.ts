import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiResponse } from 'src/schemas/response.dto';

@Controller('todolists/:todolistId/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('todolistId') todolistId: number,
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: any,
  ) {
    const response = await this.taskService.create(
      todolistId,
      createTaskDto,
      req.user.id,
    );
    return new ApiResponse('success', 'New To-Do task was added', response);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Param('todolistId') todolistId: number) {
    const response = await this.taskService.findAllByTodoList(todolistId);
    return new ApiResponse('success', 'All To-Do tasks was received', response);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':taskId')
  async update(
    @Param('taskId') taskId: number,
    @Param('todolistId') todolistId: number,
    @Body() body: { name: string; description: string },
    @Request() req: any,
  ) {
    const response = await this.taskService.update(
      taskId,
      body.name,
      body.description,
      todolistId,
      req.user.id,
    );
    return new ApiResponse('success', 'To-Do task was updated', response);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':taskId')
  async delete(
    @Param('taskId') taskId: number,
    @Param('todolistId') todolistId: number,
    @Request() req: any,
  ) {
    const response = await this.taskService.delete(
      taskId,
      todolistId,
      req.user.id,
    );
    return new ApiResponse('success', 'To-Do task was deleted', response);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':taskId')
  async toggleCompletion(
    @Param('taskId') taskId: number,
    @Body() body: { completed: boolean },
  ) {
    console.log(
      `Updating task ${taskId}, setting completed to`,
      body.completed,
    );

    const response = await this.taskService.toggleCompletion(
      taskId,
      body.completed,
    );
    return new ApiResponse(
      'success',
      'To-Do task completion status updated',
      response,
    );
  }
}
