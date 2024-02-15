import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @Column()
    name: string;

    @Column()
    qty: number;

    @Column()
    price: number;

    @Column()
    photo: string;
}