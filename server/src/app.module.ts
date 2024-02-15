import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: Number(process.env.MYSQL_LOCAL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true, // for development only
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule
  ],
})
export class AppModule {

}

// console.log(process.env.MYSQL_HOST);
// console.log(process.env.MYSQL_LOCAL_PORT);
// console.log(process.env.MYSQL_USERNAME);
// console.log(process.env.MYSQL_PASSWORD);
// console.log(process.env.MYSQL_DATABASE);

