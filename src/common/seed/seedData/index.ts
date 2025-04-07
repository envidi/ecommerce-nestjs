import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProductEntity } from 'src/entity';
import { EntityManager } from 'typeorm';

export const seedData = async (manager: EntityManager): Promise<void> => {
  async function seedProduct() {
    const total = 1000000;
    const batchSize = 500;

    console.log('start');
    for (let i = 0; i < total; i += batchSize) {
      const products: ProductEntity[] = [];
      for (let j = 0; j < batchSize && i + j < total; j++) {
        const product = new ProductEntity();
        product.name = faker.person.fullName();
        product.price = 100;
        product.description = 'hello' + i + j;
        products.push(product);
      }
      try {
        await manager.getRepository(ProductEntity).save(products);
        console.log(`✅ Seeded ${i + products.length} / ${total}`);
      } catch (error) {
        console.log(error);
        throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  await seedProduct();
};
