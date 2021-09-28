import { ObjectID, ObjectId } from "bson";
import {Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn} from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: any;
}