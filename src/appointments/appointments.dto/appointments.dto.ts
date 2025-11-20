import { IsDate } from "class-validator";

export class AppointmentsDto {
    @IsDate()
    readonly appointment_date: Date;

    
}
