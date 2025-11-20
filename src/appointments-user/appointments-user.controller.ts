/* eslint-disable prettier/prettier */

import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AppointmentsUserService } from './appointments-user.service';
import { Roles } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('appointments-user')
export class AppointmentsUserController {
    constructor(private readonly appointmentsUserService: AppointmentsUserService) {}

    @Roles('paciente')
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard) 
    async deleteMyAppointment(@Req() req, @Param('id') id: string) {
    const userId = req.user.id;
    await this.appointmentsUserService.deleteAppointmentByPatient(userId, id);
    return { message: 'Deleted' };
    }

}
