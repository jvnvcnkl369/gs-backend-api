import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation, IsNull, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Task } from "./Task.js"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(() => Task, task => task.user)
    tasks: Relation<User>[]

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
