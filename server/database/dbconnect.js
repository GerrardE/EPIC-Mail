import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let connect;

if (process.env.NODE_ENV === 'test:dev') {
  connect = {
    connectionString: process.env.TEST_DATABASE_URL
  };
} else {
  connect = {
    connectionString: process.env.LOCAL_DATABASE_URL || process.env.DATABASE_URL
  };
}

const pool = new Pool(connect);

pool.on('connect', () => {
  console.log('db connection established');
});

export default pool;
