import { Pool } from 'pg';

const connect = {
  connectionString: process.env.DATABASE_URL
};

const pool = new Pool(connect);

export default pool;
