const pool = require('../config/db');

class Model {
  constructor(table) {
    this.table = table;
  }

  async findOne(conditions) {
    const keys = Object.keys(conditions);
    const values = Object.values(conditions);
    const whereClause = keys.map(key => `${key} = ?`).join(' AND ');
    
    const [rows] = await pool.query(`SELECT * FROM ${this.table} WHERE ${whereClause}`, values);
    return rows[0];
  }

  async findAll(conditions = {}, options = {}) {
    // Build WHERE clause if conditions exist
    const whereClause = Object.keys(conditions).length > 0
      ? `WHERE ${Object.keys(conditions).map(key => `${key} = ?`).join(' AND ')}`
      : '';

    // Handle options
    const orderClause = options.orderBy
      ? `ORDER BY ${options.orderBy} ${options.orderDirection || 'ASC'}`
      : '';

    const limitClause = options.limit
      ? `LIMIT ${options.limit}`
      : '';

    const offsetClause = options.offset
      ? `OFFSET ${options.offset}`
      : '';

    const query = `
      SELECT * FROM ${this.table}
      ${whereClause}
      ${orderClause}
      ${limitClause}
      ${offsetClause}
    `;

    const [rows] = await pool.query(
      query,
      Object.values(conditions)
    );

    return rows;
  }

  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    
    const [result] = await pool.query(
      `INSERT INTO ${this.table} (${keys.join(', ')}) VALUES (${placeholders})`,
      values
    );
    return result.insertId;
  }
}

module.exports = Model;