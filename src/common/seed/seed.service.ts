import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seedData } from './seedData';

@Injectable()
export class SeedService {
  constructor(private readonly connection: DataSource) {}
  async seed() {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      await seedData(manager);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error seeding data:', error);
    } finally {
      await queryRunner.release();
    }
  }
}
