/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Roles } from 'src/roles/roles.decorator';
import { AppointmentsEntity } from './appointments.entity/appointments.entity';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { AppointmentsDto } from './appointments.dto/appointments.dto';

@Controller('appointments')
export class AppointmentsController {

    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Roles('paciente')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createAppointment(@Body() appointmentDto: AppointmentsDto): Promise<AppointmentsEntity> {
        const appointment = plainToInstance(AppointmentsEntity, appointmentDto);
        return this.appointmentsService.createAppointment(appointment);
    }

    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAllAppointments(): Promise<AppointmentsEntity[]> {
        return this.appointmentsService.getAllAppointments();
    }

    

}
