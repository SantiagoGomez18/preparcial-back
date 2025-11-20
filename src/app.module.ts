/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { RoleEntity } from './roles/role.entity/role.entity';
import { UserEntity } from './users/user.entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentsEntity } from './appointments/appointments.entity/appointments.entity';
import { AppointmentsUserModule } from './appointments-user/appointments-user.module';


@Module({
  imports: [UsersModule, RolesModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
     type: 'postgres',
     host: process.env.DB_HOST,
     port: Number(process.env.DB_PORT),
     username: process.env.DB_USER,
     password: process.env.DB_PASS,
     database: process.env.DB_NAME,
     entities:[UserEntity, RoleEntity, AppointmentsEntity],
     dropSchema: false,
     synchronize: false,
   }),
    AppointmentsModule,
    AppointmentsUserModule,
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
