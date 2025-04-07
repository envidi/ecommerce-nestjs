export default () => ({
  dbPort: process.env.DB_PORT,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
});
