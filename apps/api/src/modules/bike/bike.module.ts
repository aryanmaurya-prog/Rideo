import { Module } from '@nestjs/common';
import { BikeController } from './bike.controller';
import { BikeService } from './bike.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BikeController],
  providers: [BikeService],
  exports: [BikeService],
})
export class BikeModule {}
