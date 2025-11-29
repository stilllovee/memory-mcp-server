const { v4: uuidv4 } = require('uuid');

/**
 * Task management functionality
 */
class MemoryManager {
  constructor(database) {
    this.db = database;
  }
  /**
   * Save a final summary globally
   */
  async saveFinalSummary(summary) {
    console.log('[MCP Server] Saving final summary globally');

    const summaryId = uuidv4();
    const savedSummary = await this.db.saveSummary(summaryId, summary);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            summary_id: summaryId,
            message: 'Summary saved successfully',
            summary: savedSummary
          }, null, 2),
        },
      ],
    };
  }

  /**
   * Retrieve saved summaries globally (10 latest by default)
   */
  async getSummaries(limit = 10) {
    console.log(`[MCP Server] Retrieving ${limit} latest summaries globally`);

    const summaries = await this.db.getSummaries(limit);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            total_summaries: summaries.length,
            summaries: summaries
          }, null, 2),
        },
      ],
    };
  }
}

module.exports = {
  MemoryManager: MemoryManager,
};