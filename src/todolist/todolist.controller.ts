import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodoListService } from './todolist.service';
import { CreateTodoListDto } from './dto/create-todolist.dto';
import { ApiResponse } from 'src/schemas/response.dto';

@Controller('todolists')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createTodoListDto: CreateTodoListDto,
    @Request() req: any,
  ) {
    const response = await this.todoListService.create(createTodoListDto, req.user.id);
    return new ApiResponse('success', 'New To-Do list was created with success', response)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    const response = await this.todoListService.findAllByUser(req.user.id);
    return new ApiResponse('success', 'You get all list with success', response)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: { name: string }, @Request() req: any) {
    const response = await this.todoListService.update(id, body.name, req.user.id);
    return new ApiResponse('success', 'You update list with success', response)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Request() req: any) {
    const response = await this.todoListService.delete(id, req.user.id);
    return new ApiResponse('success', 'List was deleted with success', response)
  }
}
