/* eslint-disable prettier/prettier */

import { IsString } from "class-validator";

export class RoleDto {
    @IsString()
    readonly role_name: string;

    @IsString()
    readonly description: string;
}
