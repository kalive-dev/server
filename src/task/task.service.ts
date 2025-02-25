import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '../models/task.model';
import { TodoList } from '../models/todolist.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { PermissionService } from 'src/common/permission.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
    @InjectModel(TodoList)
    private readonly todoListModel: typeof TodoList,

    private readonly permissionService: PermissionService,
  ) {}

  async create(todolistId: number, createTaskDto: CreateTaskDto, userId: number) {
    const { name, description } = createTaskDto;
    const todolist = await this.todoListModel.findByPk(todolistId);

    if (!todolist) {
      throw new NotFoundException('To-Do list not found');
    }

    await this.permissionService.checkAdminOrOwner(todolistId, userId);

    const task = this.taskModel.build<Task>({
      name,
      description,
      todolistId,
    } as Task);

    await task.save();

    return this.taskModel.findAll({
      where: { todolistId },
      include: [TodoList],
    });
  }

  async findAllByTodoList(todolistId: number) {
    return this.taskModel.findAll({
      where: { todolistId },
      include: [TodoList],
    });
  }

  async update(
    id: number,
    name: string,
    description: string,
    todolistId: number,
    userId: number
  ) {
    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.permissionService.checkAdminOrOwner(todolistId, userId);

    task.name = name;
    task.description = description;
    await task.save();
    return await this.taskModel.findByPk(id);
  }

  async delete(
    id: number,
    todolistId: number,
    userId: number) {
    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.permissionService.checkAdminOrOwner(todolistId, userId);
    
    await task.destroy();
    return { message: 'Task deleted successfully' };
  }

  async toggleCompletion(id: number, completed: boolean) {
    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.completed = completed;
    await task.save();
    return await this.taskModel.findByPk(id);
  }
}
