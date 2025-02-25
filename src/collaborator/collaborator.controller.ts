import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { ApiResponse } from 'src/schemas/response.dto';

@Controller('todolists/:todolistId/collaborators')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addCollaborator(
    @Param('todolistId') todolistId: number,
    @Body() createCollaboratorDto: CreateCollaboratorDto,
    @Request() req: any
  ) {
    const response = await this.collaboratorService.addCollaborator(
      todolistId,
      createCollaboratorDto,
      req.user.id
    );
    return new ApiResponse('success', 'New collaborator was added to List', response)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Param('todolistId') todolistId: number) {
    const response = await this.collaboratorService.findAllByTodoList(todolistId);
    return new ApiResponse('success', 'All coloborators was received', response)
  }
}
