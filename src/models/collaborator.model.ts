import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { TodoList } from './todolist.model';

@Table
export class Collaborator extends Model<Collaborator> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => TodoList)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  todolistId: number;

  @BelongsTo(() => TodoList)
  todolist: TodoList;

  @Column({
    type: DataType.ENUM('admin', 'viewer'),
    allowNull: false,
  })
  role: 'admin' | 'viewer';
}
