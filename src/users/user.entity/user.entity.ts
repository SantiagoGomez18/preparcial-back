/* eslint-disable prettier/prettier */

import { Exclude } from "class-transformer";
import { RoleEntity } from "src/roles/role.entity/role.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    name:string;

    @Column({ nullable: true })
    phone:number;

    @Column({ default: true })
    is_active:boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToMany(() => RoleEntity, role => role.users)
    @JoinTable({
    name: 'users_roles',        
    joinColumn: {
        name: 'usersId',         
        referencedColumnName: 'id',
    },
    inverseJoinColumn: {
        name: 'rolesId',         
        referencedColumnName: 'id',
    },
})
    roles: RoleEntity[];
}
