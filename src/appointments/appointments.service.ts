/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentsEntity } from './appointments.entity/appointments.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/user.entity/user.entity';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(AppointmentsEntity)
        private readonly appointmentsRepository: Repository<AppointmentsEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}

    async createAppointment(appointment : AppointmentsEntity): Promise<AppointmentsEntity> {
        return this.appointmentsRepository.save(appointment);
    }

    async getAllAppointments(): Promise<AppointmentsEntity[]> {
        return this.appointmentsRepository.find({ relations: ['user'] });
    }

    async getAppointmentsByUserId(userId: string): Promise<AppointmentsEntity[]> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles'],
        });
        if (user?.roles.some(role => role.role_name === 'doctor')) {
            return this.appointmentsRepository.find({ where: { id_doctor: userId }, relations: ['user'] });
        }
        else if(user?.roles.some(role => role.role_name === 'paciente')){
            return this.appointmentsRepository.find({ where: { id_user: userId }, relations: ['user'] });
        }
        return [];
    }


    async deleteAppointmentByPatient(userId: string, appointmentId: string): Promise<void> {
        const appointment = await this.appointmentsRepository.findOne({ where: { id: appointmentId } });
        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }
        if (appointment.id_user !== userId) {
            throw new ForbiddenException('Not authorized to delete this appointment');
        }

        await this.appointmentsRepository.remove(appointment);
    }



}
