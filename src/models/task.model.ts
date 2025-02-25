import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { TodoList } from './todolist.model';

@Table
export class Task extends Model<Task> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  completed: boolean;

  @ForeignKey(() => TodoList)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  todolistId: number;

  @BelongsTo(() => TodoList)
  todolist: TodoList;
}
