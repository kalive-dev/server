import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TodoList } from '../models/todolist.model';
import { Collaborator } from 'src/models/collaborator.model';
import { User } from '../models/user.model';
import { CreateTodoListDto } from './dto/create-todolist.dto';
import { PermissionService } from 'src/common/permission.service';

@Injectable()
export class TodoListService {
  constructor(
    @InjectModel(TodoList)
    private readonly todoListModel: typeof TodoList,

    private readonly permissionService: PermissionService,
  ) {}

  async create(createTodoListDto: CreateTodoListDto, ownerId: number) {
    const { name } = createTodoListDto;
    const todoList = this.todoListModel.build<TodoList>({
      name,
      ownerId,
    } as TodoList);
    await todoList.save();

    return this.todoListModel.findAll({
      where: { ownerId: ownerId },
      include: [User],
    });
  }

  async findAllByUser(userId: number) {
    return this.todoListModel.findAll({
      where: { ownerId: userId },
      include: [User],
    });
  }

  async update(id: number, name: string, userId: number) {
    const todoList = await this.todoListModel.findByPk(id);
    if (!todoList) {
      throw new NotFoundException('To-Do list not found');
    }
    
    await this.permissionService.checkAdminOrOwner(id, userId);

    todoList.name = name;
    await this.todoListModel.update({ name }, { where: { id } });

    const UpdatedTodoList = await this.todoListModel.findByPk(id);
    return UpdatedTodoList;
  }

  async delete(id: number, userId: number) {
    const todoList = await this.todoListModel.findByPk(id);
    if (!todoList) {
      throw new NotFoundException('To-Do list not found');
    }

    await this.permissionService.checkAdminOrOwner(id, userId);

    await todoList.destroy();
    return this.todoListModel.findAll({
      where: { ownerId: userId },
      include: [User],
    });
  }
}
