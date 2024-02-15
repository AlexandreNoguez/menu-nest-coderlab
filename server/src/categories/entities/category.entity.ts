import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Category, { nullable: true })
    parent: Category | null;

    @OneToMany(() => Product, product => product.categories)
    products: Product[];
}
