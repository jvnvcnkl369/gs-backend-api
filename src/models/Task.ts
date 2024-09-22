import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
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

    @Column()
    userId: string;
  
    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: "userId" })
    user: Relation<User>;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}