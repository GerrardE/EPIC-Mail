import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const connect = {
  connectionString: 'postgres://sqsstahvqgsbdd:dfeab3f25d933c04c43afc93529659ab77ba689bd25ca11aa7e5e1d16b907e66@ec2-184-73-216-48.compute-1.amazonaws.com:5432/dc8g9alent2kjb'
  // process.env.DATABASE_URL
};

const pool = new Pool(connect);

pool.on('connect', () => {
  console.log('db connection established');
});

export default pool;
