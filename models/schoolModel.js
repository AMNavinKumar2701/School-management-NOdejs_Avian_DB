const { pool } = require('../config/db');

const createTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(500) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.execute(sql);
};

const insertSchool = async ({ name, address, latitude, longitude }) => {
  const sql = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.execute(sql, [name, address, latitude, longitude]);
  return result;
};

const getAllSchools = async () => {
  const sql = `SELECT id, name, address, latitude, longitude FROM schools`;
  const [rows] = await pool.execute(sql);
  return rows;
};

module.exports = { createTable, insertSchool, getAllSchools };
