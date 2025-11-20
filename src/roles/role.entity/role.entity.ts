/* eslint-disable prettier/prettier */

import { UserEntity } from "src/users/user.entity/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    role_name: string;
    @Column({default: ''})
    description: string;

    @ManyToMany(() => UserEntity, user => user.roles)
    users: UserEntity[];
}
