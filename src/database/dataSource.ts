import { DataSource, DataSourceOptions } from 'typeorm';
import configuration from 'src/config/configuration';
import { CategoryEntity, ProductEntity, UserEntity } from 'src/entity';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-require-imports
require('dotenv').config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  port: 3306,
  host: configuration().dbHost,
  entities: [UserEntity, ProductEntity, CategoryEntity],
  username: configuration().username,
  password: configuration().password,
  database: configuration().dbName,
  synchronize: false,
  migrations: ['dist/database/migrations/*.js'],
  migrationsRun: false,
  // ssl: true,
  // extra: {
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
