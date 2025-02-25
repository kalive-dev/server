import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionService } from './permission.service';
import { Collaborator } from 'src/models/collaborator.model';
import { TodoList } from 'src/models/todolist.model';

@Module({
    imports: [SequelizeModule.forFeature([TodoList, Collaborator])],
    providers: [PermissionService],
    exports: [PermissionService],
})
export class CommonModule {}
