const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class TaskDatabase {
  constructor(dbPath = null) {
    this.dbPath = dbPath || path.join(process.cwd(), 'summaries.db');
    this.db = new sqlite3.Database(this.dbPath);
    this.initializeDatabase();
  }

  /**
   * Initialize SQLite database for task management
   */
  initializeDatabase() {
    this.db.run(`
      DROP TABLE IF EXISTS summaries;
      CREATE TABLE IF NOT EXISTS summaries (
        summary_id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);
  }

  /**
   * Save a summary
   */
  async saveSummary(summaryId, content) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO summaries (summary_id, content, created_at)
        VALUES (?, ?, datetime('now'))
      `;

      this.db.run(sql, [summaryId, content], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            summary_id: summaryId,
            content: content,
            created_at: new Date().toISOString()
          });
        }
      });
    });
  }

  /**
   * Get all summaries
   */
  async getSummaries(limit = 10) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT summary_id, content, created_at
        FROM summaries
        ORDER BY created_at DESC
        LIMIT ?
      `;

      this.db.all(sql, [limit], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  /**
   * Close database connection
   */
  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error('[MCP Server] Error closing database:', err);
        } else {
          console.log('[MCP Server] Database connection closed');
        }
      });
    }
  }
}

module.exports = {
  TaskDatabase,
};