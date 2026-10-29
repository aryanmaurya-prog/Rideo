import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { QueryBikeDto } from './dto/query-bike.dto';

@Injectable()
export class BikeService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryBikeDto) {
    const { city, category, q, sort, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (city) where.city = { equals: city, mode: 'insensitive' };
    if (category) where.category = { equals: category, mode: 'insensitive' };
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { city: { contains: q, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price-low') orderBy = { hourlyRatePaise: 'asc' };
    if (sort === 'price-high') orderBy = { hourlyRatePaise: 'desc' };

    const [bikes, total] = await Promise.all([
      this.prisma.bike.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          category: true,
          city: true,
          latitude: true,
          longitude: true,
          hourlyRatePaise: true,
          status: true,
          imageUrl: true,
          registrationNumber: true,
          year: true,
          engineCc: true,
          mileageKmpl: true,
          fuelType: true,
          transmission: true,
          features: true,
          description: true,
          rating: true,
          totalRides: true,
        },
      }),
      this.prisma.bike.count({ where }),
    ]);

    return {
      data: bikes,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const bike = await this.prisma.bike.findUnique({
      where: { id },
      include: {
        bookings: {
          select: {
            id: true,
            startsAt: true,
            endsAt: true,
            status: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    return bike;
  }

  async create(dto: CreateBikeDto) {
    const bike = await this.prisma.bike.create({
      data: {
        name: dto.name,
        category: dto.category,
        city: dto.city,
        latitude: dto.latitude,
        longitude: dto.longitude,
        hourlyRatePaise: dto.hourlyRatePaise,
        imageUrl: dto.imageUrl,
        registrationNumber: dto.registrationNumber,
        year: dto.year,
        engineCc: dto.engineCc,
        mileageKmpl: dto.mileageKmpl,
        fuelType: dto.fuelType,
        transmission: dto.transmission,
        features: dto.features || [],
        description: dto.description,
        rating: 0,
        totalRides: 0,
      },
    });

    return bike;
  }

  async update(id: string, dto: UpdateBikeDto) {
    const existing = await this.prisma.bike.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Bike not found');
    }

    return this.prisma.bike.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.bike.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Bike not found');
    }

    return this.prisma.bike.delete({ where: { id } });
  }
}
