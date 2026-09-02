import { test } from "node:test";
import assert from "node:assert/strict";
import { MockAgent, setGlobalDispatcher } from "undici";
import { ServiceFusionAuth, ServiceFusionAuthError } from "../src/auth.js";

function setupMockAgent(): MockAgent {
  const agent = new MockAgent();
  agent.disableNetConnect();
  setGlobalDispatcher(agent);
  return agent;
}

test("fetches and caches an access token", async () => {
  const agent = setupMockAgent();
  const pool = agent.get("https://auth.example.com");
  pool
    .intercept({ path: "/oauth/access_token", method: "POST" })
    .reply(200, { access_token: "tok-1", token_type: "Bearer", expires_in: 3600 });

  const auth = new ServiceFusionAuth({
    clientId: "id",
    clientSecret: "secret",
    tokenUrl: "https://auth.example.com/oauth/access_token",
  });

  const token = await auth.getAccessToken();
  assert.equal(token, "tok-1");

  // Second call should use cache, not hit the network again.
  const token2 = await auth.getAccessToken();
  assert.equal(token2, "tok-1");
});

test("invalidateToken forces a refetch", async () => {
  const agent = setupMockAgent();
  const pool = agent.get("https://auth.example.com");
  pool
    .intercept({ path: "/oauth/access_token", method: "POST" })
    .reply(200, { access_token: "tok-1", token_type: "Bearer", expires_in: 3600 });
  pool
    .intercept({ path: "/oauth/access_token", method: "POST" })
    .reply(200, { access_token: "tok-2", token_type: "Bearer", expires_in: 3600 });

  const auth = new ServiceFusionAuth({
    clientId: "id",
    clientSecret: "secret",
    tokenUrl: "https://auth.example.com/oauth/access_token",
  });

  const first = await auth.getAccessToken();
  auth.invalidateToken();
  const second = await auth.getAccessToken();

  assert.equal(first, "tok-1");
  assert.equal(second, "tok-2");
});

test("throws ServiceFusionAuthError on non-2xx response", async () => {
  const agent = setupMockAgent();
  const pool = agent.get("https://auth.example.com");
  pool
    .intercept({ path: "/oauth/access_token", method: "POST" })
    .reply(401, "invalid_client");

  const auth = new ServiceFusionAuth({
    clientId: "bad",
    clientSecret: "bad",
    tokenUrl: "https://auth.example.com/oauth/access_token",
  });

  await assert.rejects(() => auth.getAccessToken(), ServiceFusionAuthError);
});

test("throws when clientId or clientSecret is missing", () => {
  assert.throws(() => new ServiceFusionAuth({ clientId: "", clientSecret: "" }));
});
