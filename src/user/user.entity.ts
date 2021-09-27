import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {IsBoolean, IsString} from 'class-validator'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    firstName: string;

    @Column()
    @IsString()
    lastName: string;

    @Column()
    @IsBoolean()
    isActive: boolean;

}