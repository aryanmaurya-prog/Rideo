import {
  IsString,
  IsDateString,
  IsOptional,
  IsNumber,
  IsBoolean,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  bikeId!: string;

  @IsDateString()
  startsAt!: string;

  @IsDateString()
  endsAt!: string;

  @IsNumber()
  @IsOptional()
  pickupLat?: number;

  @IsNumber()
  @IsOptional()
  pickupLng?: number;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(300)
  pickupAddress!: string;

  @IsString()
  @Matches(/^\d{12}$/, { message: 'Aadhaar number must contain exactly 12 digits' })
  aadhaarNumber!: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  drivingLicense!: string;

  @IsBoolean()
  agreedToTerms!: boolean;
}
