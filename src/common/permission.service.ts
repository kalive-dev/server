import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Collaborator } from 'src/models/collaborator.model';
import { TodoList } from 'src/models/todolist.model';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(TodoList)
    private readonly todoListModel: typeof TodoList,
    @InjectModel(Collaborator)
    private readonly collaboratorModel: typeof Collaborator
  ) {}

  async checkAdminOrOwner(todolistId: number, userId: number) {
    const collaborator = await this.collaboratorModel.findOne({
      where: { todolistId: todolistId, userId: userId, role: 'admin' },
    });

    const todolist = await this.todoListModel.findByPk(todolistId);

    if (!todolist){
      throw new ForbiddenException('To-Do list not found');
    }

    if (!collaborator && todolist.dataValues.ownerId != userId) {
      throw new ForbiddenException('You do not have permission to perform this action');
    }
  }
}
