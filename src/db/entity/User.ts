import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import {IsNotEmpty, IsEmail, IsInt, IsString} from "class-validator";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @IsEmail()
    @Column()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    password!: string;
}
