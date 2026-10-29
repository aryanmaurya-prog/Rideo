import { IsString, IsInt, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateBikeDto {
  @IsString()
  name!: string;

  @IsString()
  category!: string;

  @IsString()
  city!: string;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsInt()
  hourlyRatePaise!: number;

  @IsString()
  imageUrl!: string;

  @IsString()
  registrationNumber!: string;

  @IsInt()
  year!: number;

  @IsInt()
  @IsOptional()
  engineCc?: number;

  @IsNumber()
  @IsOptional()
  mileageKmpl?: number;

  @IsString()
  fuelType!: string;

  @IsString()
  transmission!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @IsString()
  description!: string;
}
