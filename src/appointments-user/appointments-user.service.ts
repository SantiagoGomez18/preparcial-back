/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AppointmentsUserService {
    constructor(
        private readonly appointmentsService: AppointmentsService,
        private readonly usersService: UsersService,
    ) {}

    async deleteAppointmentByPatient(userId: string, appointmentId: string): Promise<void> {
        return this.appointmentsService.deleteAppointmentByPatient(userId, appointmentId);
    }

    

}
