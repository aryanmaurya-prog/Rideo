import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { BikeModule } from './modules/bike/bike.module';
import { BookingModule } from './modules/booking/booking.module';
import { ForecastModule } from './modules/forecast/forecast.module';
import { HeatmapModule } from './modules/heatmap/heatmap.module';
import { KpiModule } from './modules/kpi/kpi.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ReportsModule } from './modules/reports/reports.module';
import { UserModule } from './modules/user/user.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { AdminModule } from './modules/admin/admin.module'; // 👈 Naya add kiya
import { HealthController } from './health.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '../../.env'] }),
    DatabaseModule,
    AuthModule,
    UserModule,
    BikeModule,
    BookingModule,
    PaymentModule,
    KpiModule,
    HeatmapModule,
    ForecastModule,
    ReportsModule,
    WebsocketModule,
    AdminModule, // 👈 Naya add kiya
  ],
  controllers: [HealthController],
})
export class AppModule {}
