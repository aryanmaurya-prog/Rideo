import { IsString, IsInt, IsNumber, IsArray, IsOptional } from 'class-validator';

export class UpdateBikeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsInt()
  @IsOptional()
  hourlyRatePaise?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsInt()
  @IsOptional()
  engineCc?: number;

  @IsNumber()
  @IsOptional()
  mileageKmpl?: number;

  @IsString()
  @IsOptional()
  fuelType?: string;

  @IsString()
  @IsOptional()
  transmission?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @IsString()
  @IsOptional()
  description?: string;
}
