import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    qty: number;

    @Column()
    price: number;

    @Column()
    photo: string;

    @ManyToOne(() => Category, category => category.products)
    category: number;
}