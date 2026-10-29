import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateBookingDto) {
    const startsAt = new Date(dto.startsAt);
    const endsAt = new Date(dto.endsAt);

    if (startsAt >= endsAt) {
      throw new BadRequestException('End time must be after start time');
    }

    if (startsAt <= new Date()) {
      throw new BadRequestException('Start time must be in the future');
    }

    if (!dto.agreedToTerms) {
      throw new BadRequestException('You must agree to the bike damage responsibility terms');
    }
    if (dto.pickupAddress.trim().length < 5 || dto.drivingLicense.trim().length < 5) {
      throw new BadRequestException('Pickup address and driving license number must be valid');
    }

    const bike = await this.prisma.bike.findUnique({
      where: { id: dto.bikeId },
    });

    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    if (bike.status !== 'AVAILABLE') {
      throw new BadRequestException('Bike is not available for booking');
    }

    const conflictingBooking = await this.prisma.booking.findFirst({
      where: {
        bikeId: dto.bikeId,
        status: { in: ['PENDING', 'CONFIRMED', 'ACTIVE'] },
        OR: [{ startsAt: { lte: endsAt }, endsAt: { gte: startsAt } }],
      },
    });

    if (conflictingBooking) {
      throw new BadRequestException('Bike is already booked for these dates');
    }

    const durationMs = endsAt.getTime() - startsAt.getTime();
    const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));
    const totalPaise = durationHours * bike.hourlyRatePaise;

    const booking = await this.prisma.booking.create({
      data: {
        userId,
        bikeId: dto.bikeId,
        startsAt,
        endsAt,
        totalPaise,
        status: 'PENDING',
        paymentMethod: dto.paymentMethod,
        paymentStatus: 'PENDING',
        pickupAddress: dto.pickupAddress.trim(),
        aadhaarNumber: dto.aadhaarNumber,
        drivingLicense: dto.drivingLicense.trim(),
        agreedToTerms: dto.agreedToTerms,
        pickupLat: dto.pickupLat,
        pickupLng: dto.pickupLng,
      },
      include: {
        bike: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            city: true,
          },
        },
      },
    });

    return booking;
  }

  async findMyBookings(userId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: { userId },
      include: {
        bike: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            city: true,
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return bookings;
  }

  async findOne(userId: string, id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        bike: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            city: true,
            category: true,
            hourlyRatePaise: true,
          },
        },
        user: {
          select: {
            id: true,
            displayName: true,
            phone: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only view your own bookings');
    }

    return booking;
  }

  async cancel(userId: string, id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only cancel your own bookings');
    }

    if (['COMPLETED', 'CANCELLED'].includes(booking.status)) {
      throw new BadRequestException(`Cannot cancel a ${booking.status} booking`);
    }

    const updated = await this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    return updated;
  }

  async findAll() {
    const bookings = await this.prisma.booking.findMany({
      include: {
        bike: {
          select: { id: true, name: true, imageUrl: true },
        },
        user: {
          select: { id: true, displayName: true, phone: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return bookings;
  }

  async updateStatus(id: string, status: string) {
    const existing = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Booking not found');
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: status as any },
    });
  }
}
