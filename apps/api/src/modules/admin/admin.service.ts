import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const totalUsers = await this.prisma.user.count();
    const totalBikes = await this.prisma.bike.count();
    const totalBookings = await this.prisma.booking.count();

    const completedBookings = await this.prisma.booking.findMany({
      where: { status: 'COMPLETED' },
      select: { totalPaise: true },
    });
    const totalRevenue = completedBookings.reduce((acc, curr) => acc + curr.totalPaise, 0);

    const recentBookings = await this.prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { displayName: true, phone: true } },
        bike: { select: { name: true, imageUrl: true } },
      },
    });

    const bikesGrouped = await this.prisma.bike.groupBy({
      by: ['city'],
      _count: { id: true },
    });
    const bikesByCity = bikesGrouped
      .map((g) => ({
        city: g.city,
        count: g._count.id,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      stats: {
        totalUsers,
        totalBikes,
        totalBookings,
        totalRevenuePaise: totalRevenue,
      },
      recentBookings,
      bikesByCity,
    };
  }
}
