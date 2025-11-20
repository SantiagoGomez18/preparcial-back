/* eslint-disable prettier/prettier */


import { UserEntity } from "src/users/user.entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../status";

    
@Entity()
export class AppointmentsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, type: 'timestamp'})
    datatime: Date;

    @Column()
    status:Status;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created_at: Date;

    @Column()
    id_user: string;

    @Column()
    id_doctor: string;

    @ManyToOne(() => UserEntity, user => user.appointments)
    user: UserEntity;
}
