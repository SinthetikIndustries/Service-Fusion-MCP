# Service Fusion MCP

Public MCP server exposing the full documented Service Fusion REST API
(customers, jobs, estimates, invoices, calendar tasks, equipment,
technicians, reference data) over stdio. TypeScript, `@modelcontextprotocol/sdk`.

Read/create only — the Service Fusion API documents no update/delete
operation on any resource.

Build: `npm run build` (compiles `src/` to `build/`, the entrypoint
registered servers actually run). Test: `npm test` (fully offline, mocked
HTTP via `undici`'s `MockAgent`).

See `README.md` for install/config (Claude Code, Claude Desktop, other MCP
clients) and `service-fusion-api-reference.md` for the API spec this was
built against.
