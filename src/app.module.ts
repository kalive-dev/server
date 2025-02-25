import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './models/user.model';
import { TodoList } from './models/todolist.model';
import { Task } from './models/task.model';
import { Collaborator } from './models/collaborator.model';
import { AuthModule } from './auth/auth.module';
import { TodoListModule } from './todolist/todolist.module';
import { TaskModule } from './task/task.module';
import { CollaboratorModule } from './collaborator/collaborator.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '19295', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, TodoList, Task, Collaborator],
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    AuthModule,
    TodoListModule,
    TaskModule,
    CollaboratorModule,
  ],
})
export class AppModule {}
