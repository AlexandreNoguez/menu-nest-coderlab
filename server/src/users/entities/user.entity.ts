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

    static createUserWithoutPassword(user: User): User {
        const newUser = new User();
        newUser.id = user.id;
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.role = user.role;
        newUser.isActive = user.isActive;
        return newUser;
    }
}
