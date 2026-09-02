# Service Fusion MCP

An [MCP](https://modelcontextprotocol.io) server exposing the full documented [Service Fusion](https://servicefusion.com) REST API to AI agents — Claude Code, Claude Desktop, Codex, or any MCP-compatible client. Runs locally over stdio.

Built and maintained by [Sinthetix](https://github.com/SinthetikIndustries).

## Features

- Full coverage of the documented Service Fusion REST API: customers, jobs, estimates, invoices, calendar tasks, equipment, technicians, and reference data (categories, job statuses, sources, payment types)
- Read/create operations only — the Service Fusion API documents no `PUT`/`PATCH`/`DELETE` on any endpoint, so this server doesn't expose any
- Automatic OAuth 2.0 client-credentials token handling with caching and refresh
- Pagination handled transparently across all list endpoints
- Reacts to live `429`/rate-limit response headers rather than self-throttling against a guessed limit (Service Fusion does not publish a numeric rate limit)
- Fully typed (TypeScript), validated request/response schemas via [Zod](https://zod.dev)
- Test suite runs fully offline against mocked HTTP responses — no live credentials required to develop or verify changes

## Requirements

- Node.js 18 or later
- A Service Fusion account with API access (My Office > Developer Settings > API Credentials)

## Installation

```bash
git clone https://github.com/SinthetikIndustries/Service-Fusion-MCP.git
cd Service-Fusion-MCP
npm install
npm run build
cp .env.example .env
```

Edit `.env` and set `SF_CLIENT_ID` and `SF_CLIENT_SECRET` from your Service Fusion account (My Office > Developer Settings > API Credentials).

## Configuration

### Claude Code

```bash
claude mcp add service-fusion node /absolute/path/to/Service-Fusion-MCP/build/index.js \
  -e SF_CLIENT_ID=your_client_id -e SF_CLIENT_SECRET=your_client_secret
```

### Claude Desktop

Claude Desktop doesn't use the `claude mcp add` CLI — edit its config file directly:

| OS      | Config path                                                       |
| ------- | ----------------------------------------------------------------- |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json`                     |
| macOS   | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Linux   | `~/.config/Claude/claude_desktop_config.json`                     |

Add a `service-fusion` entry under `mcpServers` (see [`claude_desktop_config.example.json`](./claude_desktop_config.example.json)):

```json
{
  "mcpServers": {
    "service-fusion": {
      "command": "node",
      "args": ["/absolute/path/to/Service-Fusion-MCP/build/index.js"],
      "env": {
        "SF_CLIENT_ID": "your_client_id_here",
        "SF_CLIENT_SECRET": "your_client_secret_here"
      }
    }
  }
}
```

On Windows, use a double-backslash path, e.g. `"C:\\Users\\you\\Service-Fusion-MCP\\build\\index.js"`. Restart Claude Desktop after saving — it spawns this server on demand, the same way Claude Code does; nothing runs in the background between sessions.

### Other MCP clients

Any client that supports a local stdio MCP server works the same way: point it at `node /absolute/path/to/Service-Fusion-MCP/build/index.js` with `SF_CLIENT_ID` and `SF_CLIENT_SECRET` set in its environment.

## Testing

```bash
npm test
```

Tests run fully offline against mocked HTTP responses (`undici`'s `MockAgent`) — no live Service Fusion credentials required.

## Scope

Read/create only. The Service Fusion API documents no update or delete operation on any resource, so this server exposes none. See [`service-fusion-api-reference.md`](./service-fusion-api-reference.md) for the underlying API reference this implementation was built against.

## License

[MIT](./LICENSE)
