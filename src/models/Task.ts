import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from "typeorm"
import { User } from "./User.js"

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column("text")
    description: string

    @Column({
        type: "enum",
        enum: ["low", "medium", "high"],
        default: "medium"
    })
    priority: "low" | "medium" | "high"

    @Column({
        type: "enum",
        enum: ["in progress", "done"],
        default: "in progress"
    })
    status: "in progress" | "done"

    @ManyToOne(() => User, user => user.tasks)
    user: Relation<User>
}