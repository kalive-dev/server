import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoList } from '../models/todolist.model';
import { TodoListService } from './todolist.service';
import { TodoListController } from './todolist.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    SequelizeModule.forFeature([TodoList]),
    CommonModule
  ],
  providers: [TodoListService],
  controllers: [TodoListController],
})
export class TodoListModule {}
