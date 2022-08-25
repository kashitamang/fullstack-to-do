const pool = require('../utils/pool');

module.exports = class Task {
  id;
  user_id;
  content;
  completed;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.content = row.content;
    this.completed = row.completed;
  }

  static async insert({ content, user_id }) {
    const { rows } = await pool.query(
      `
        INSERT INTO tasks (content, user_id)
      VALUES ($1, $2)
      RETURNING *
        `,
      [content, user_id]
    );
    return new Task(rows[0]);
  }

  static async getAll(user_id) {
    const { rows } = await pool.query(
      'SELECT * from tasks where user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );
    return rows.map((task) => new Task(task));
  }

  //getbyId

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM tasks
      WHERE id = $1
      `,
      [id]
    );
    if (!rows[0]) {
      return null;
    }
    return new Task(rows[0]);
  }

  //delete 
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );
    return new Task(rows[0]);
  }
  //updatebyId
};
