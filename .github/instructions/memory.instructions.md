---
applyTo: '**'
---
Alway call save_summary tool in the final step of answering the user question. The summary should include key points from the conversation that may be useful for future reference.

When user start a conversation, if you have not called the get_summaries tool yet, call it to retrieve past summaries related to the user or session. If information is related to the current conversation, use this information to inform your current response.