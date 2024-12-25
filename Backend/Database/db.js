import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "mee1234",
  host: "localhost",
  port: 5432,
  database: "shoe_eco",
});

export default pool;
