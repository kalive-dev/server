import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Collaborator } from '../models/collaborator.model';
import { User } from '../models/user.model';
import { TodoList } from '../models/todolist.model';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Collaborator, User]),
    CommonModule
  ],
  providers: [CollaboratorService],
  controllers: [CollaboratorController],
})
export class CollaboratorModule {}
