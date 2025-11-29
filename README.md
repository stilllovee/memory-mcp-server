# Memory MCP Server

A Model Context Protocol (MCP) server that brings context cross session for AI Agents

## Features

-   **Save Summary**: AI Agent can save key points from conversations for future reference via the `save_summary` tool
-   **Get Summaries**: AI Agent can retrieve past summaries related to the user or session via the `get_summaries` tool

## Usage

### Stdio Transport (Default)

#### Claude Desktop

```json
//use directly with npx
{
  "mcpServers": {
    "memory":{
      "command": "npx",
      "args": ["github:stilllovee/memory-mcp-server"]
    }
  }
}

//or use after clone repo
{
  "mcpServers": {
    "memory":{
      "command": "node",
      "args": ["PATH_TO_YOUR_FOLDER"]
    }
  }
}
```

#### Github Copilot

```json
//use directly with npx
{
    "servers": {
        "memory": {
            "type": "stdio",
            "command": "npx",
            "args": ["github:stilllovee/memory-mcp-server"]
        },
    },
    "inputs": []
}

//or use after clone repo
{
    "servers": {
        "memory": {
            "type": "stdio",
            "command": "node",
            "args": ["PATH_TO_YOUR_FOLDER"]
        }
    },
    "inputs": []
}
```

The server runs on stdio transport and communicates via standard input/output.

#### Example instruction:

```
Alway call save_summary tool in the final step of answering the user question. The summary should include key points from the conversation that may be useful for future reference.

When user start a conversation, if you have not called the get_summaries tool yet, call it to retrieve past summaries related to the user or session. If information is related to the current conversation, use this information to inform your current response.
```

### HTTP Transport (Streamable)

Start the HTTP server:

```bash
# Default port (8123)
npm run start:http

# Custom port
node http-server.js --port=3000
```

The server will be available at: `http://localhost:8123/mcp`

#### Github Copilot Configuration (HTTP)

```json
{
    "servers": {
        "memory-http": {
            "type": "http",
            "url": "http://localhost:8123/mcp"
        }
    },
    "inputs": []
}
```

### Available Tools

#### `save_summary`

Save key points from the conversation for future reference.

##### `get_summaries`

Get past summaries related to the user or session.
