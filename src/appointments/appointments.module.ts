import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsEntity } from './appointments.entity/appointments.entity';
import { UserEntity } from '../users/user.entity/user.entity';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [TypeOrmModule.forFeature([AppointmentsEntity, UserEntity])],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
