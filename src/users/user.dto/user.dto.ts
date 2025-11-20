/* eslint-disable prettier/prettier */


import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsDate, MinLength, IsOptional } from "class-validator";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsString()
    readonly name:string;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    readonly phone?:number;

    @IsBoolean()
    readonly is_active:boolean;

    @IsDate()
    readonly created_at: Date;
}
