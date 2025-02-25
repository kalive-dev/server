import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Collaborator } from '../models/collaborator.model';
import { User } from '../models/user.model';
import { TodoList } from '../models/todolist.model';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { PermissionService } from 'src/common/permission.service';

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectModel(Collaborator)
    private readonly collaboratorModel: typeof Collaborator,
    @InjectModel(User)
    private readonly userModel: typeof User,

    private readonly permissionService: PermissionService,
  ) {}

  async addCollaborator(
    todolistId: number,
    createCollaboratorDto: CreateCollaboratorDto,
    userId: number
  ) {
    const { email, role } = createCollaboratorDto;
    const user = await this.userModel.findOne({ where: { email } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.permissionService.checkAdminOrOwner(todolistId, userId);

    const existingCollaborator = await this.collaboratorModel.findOne({
      where: {
        userId: user.dataValues.id,
        todolistId: todolistId
      }
    });    

    if (existingCollaborator) {
      throw new BadRequestException('User is collaborater already');
    }

    const collaborator = this.collaboratorModel.build<Collaborator>({
      userId: user.id,
      todolistId,
      role,
    } as Collaborator);

    await collaborator.save();
    return collaborator;
  }

  async findAllByTodoList(todolistId: number) {
    return this.collaboratorModel.findAll({
      where: { todolistId },
      include: [User, TodoList],
    });
  }
}
