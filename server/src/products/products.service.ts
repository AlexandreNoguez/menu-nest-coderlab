import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {

      const product = new Product();

      product.name = createProductDto.name;
      product.qty = createProductDto.qty;
      product.price = createProductDto.price;
      product.photo = createProductDto.photo;
      product.category = createProductDto.category;

      const alreadyRegistered = await this.productsRepository.findOne({
        where: {
          name: product.name
        }
      })

      if (alreadyRegistered) {
        throw new HttpException('Product already registered', HttpStatus.CONFLICT);
      }

      await this.productsRepository.save(product);

      return product;

    } catch (error) {
      throw new HttpException('Error creating product: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.productsRepository.find();
    } catch (error) {
      throw new HttpException('Error finding product: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      if (!id) {
        throw new HttpException("Error finding product", HttpStatus.BAD_REQUEST);
      }

      const product = await this.productsRepository.findOne({
        where: {
          id,
        }
      })

      if (!product) {
        throw new HttpException("Error finding product", HttpStatus.NOT_FOUND);
      }

      return product;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      if (!id) {
        throw new HttpException("Error finding product", HttpStatus.BAD_REQUEST);
      }

      const product = await this.productsRepository.findOne({
        where: {
          id,
        }
      })

      if (!product) {
        throw new HttpException("Error finding product", HttpStatus.NOT_FOUND);
      }

      Object.assign(product, updateProductDto);

      await this.productsRepository.save(product);

      return product;

    } catch (error) {
      throw new HttpException('Error updating product: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      if (!id) {
        throw new HttpException("Error finding product", HttpStatus.BAD_REQUEST);
      }

      const product = await this.productsRepository.findOne({
        where: {
          id,
        }
      })

      if (!product) {
        throw new HttpException("Error finding product", HttpStatus.NOT_FOUND);
      }

      return this.productsRepository.delete(product);
    } catch (error) {
      throw new HttpException('Error deleting product: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
