import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from '../models/task.model';
import { TodoList } from '../models/todolist.model';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Task, TodoList]),
    CommonModule
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
