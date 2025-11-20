import { Module } from '@nestjs/common';
import { AppointmentsUserService } from './appointments-user.service';
import { AppointmentsUserController } from './appointments-user.controller';
import { AppointmentsModule } from '../appointments/appointments.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [AppointmentsModule, UsersModule],
  providers: [AppointmentsUserService],
  controllers: [AppointmentsUserController],
  exports: [AppointmentsUserService],
})
export class AppointmentsUserModule {}
