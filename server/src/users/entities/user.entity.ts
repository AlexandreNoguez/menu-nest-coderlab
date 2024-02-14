import { UserRole } from "src/enums/roles";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", nullable: false })
    name: string;

    @Column({ type: "varchar", unique: true, nullable: false })
    email: string;

    @Column({ type: "varchar", nullable: false })
    password: string;

    @Column({ type: "enum", enum: UserRole, nullable: false })
    role: UserRole

    @Column({ default: true })
    isActive: boolean;
}
