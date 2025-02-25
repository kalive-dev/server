import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Task } from './task.model';
import { Collaborator } from './collaborator.model';

@Table
export class TodoList extends Model<TodoList> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;

  @HasMany(() => Task)
  tasks: Task[];

  @HasMany(() => Collaborator)
  collaborators: Collaborator[];
}
