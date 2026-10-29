import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BikeService } from './bike.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { QueryBikeDto } from './dto/query-bike.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bikes')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @Get()
  async findAll(@Query() query: QueryBikeDto) {
    return this.bikeService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bikeService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateBikeDto) {
    return this.bikeService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateBikeDto) {
    return this.bikeService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.bikeService.remove(id);
  }
}
