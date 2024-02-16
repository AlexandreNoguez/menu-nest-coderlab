import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as data from '../../db/resource/sample'
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>

  ) { }

  /**
   * 
   * @returns this method is just used to populate db with some data for tests
   */
  async create() {
    try {
      for (const categoryData of data.categories) {
        const category = this.categoryRepository.create(categoryData);
        await this.categoryRepository.save(category);
      }
      for (const productData of data.products) {
        const product = this.productRepository.create(productData);
        await this.productRepository.save(product);
      }
    } catch (error) {
      console.error('Error creating categories:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
