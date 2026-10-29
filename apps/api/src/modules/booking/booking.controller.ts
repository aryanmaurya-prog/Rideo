import { Controller, Get, Post, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Request() req: any, @Body() dto: CreateBookingDto) {
    return this.bookingService.create(req.user.userId, dto);
  }

  @Get('my')
  async findMyBookings(@Request() req: any) {
    return this.bookingService.findMyBookings(req.user.userId);
  }

  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    return this.bookingService.findOne(req.user.userId, id);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.bookingService.updateStatus(id, status);
  }

  @Post(':id/cancel')
  async cancel(@Request() req: any, @Param('id') id: string) {
    return this.bookingService.cancel(req.user.userId, id);
  }

  @Get()
  async findAll() {
    return this.bookingService.findAll();
  }
}
