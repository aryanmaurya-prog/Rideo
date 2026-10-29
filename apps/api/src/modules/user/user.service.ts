import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phone: true,
        displayName: true,
        email: true,
        city: true,
        role: true,
        avatarUrl: true,
        totalRides: true,
        createdAt: true,
        _count: {
          select: { bookings: true },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      bookingsCount: user._count.bookings,
      _count: undefined,
    };
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        displayName: dto.displayName,
        email: dto.email,
        city: dto.city,
        avatarUrl: dto.avatarUrl,
      },
      select: {
        id: true,
        phone: true,
        displayName: true,
        email: true,
        city: true,
        role: true,
        avatarUrl: true,
        totalRides: true,
        createdAt: true,
      },
    });

    return user;
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) throw new NotFoundException('User not found');
    if (!user.password || !(await bcrypt.compare(dto.currentPassword, user.password))) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password updated successfully' };
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        phone: true,
        displayName: true,
        email: true,
        city: true,
        role: true,
        avatarUrl: true,
        totalRides: true,
        createdAt: true,
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return users.map((u) => ({
      ...u,
      bookingsCount: u._count.bookings,
      _count: undefined,
    }));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        phone: true,
        displayName: true,
        email: true,
        city: true,
        role: true,
        avatarUrl: true,
        totalRides: true,
        createdAt: true,
        bookings: {
          select: {
            id: true,
            startsAt: true,
            endsAt: true,
            status: true,
            totalPaise: true,
            bike: {
              select: {
                name: true,
                imageUrl: true,
                city: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
