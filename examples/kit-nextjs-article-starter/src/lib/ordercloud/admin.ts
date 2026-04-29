import 'server-only';
import { Auth, Configuration } from 'ordercloud-javascript-sdk';

const TIMEOUT_MS = 30 * 1000;

let configured = false;
let cachedToken: string | undefined;
let cachedExpiresAt = 0;

export async function getAdminToken(): Promise<string> {
  ensureConfigured();
  if (cachedToken && cachedExpiresAt > Date.now()) return cachedToken;

  const resp = await Auth.ClientCredentials(
    requireEnv('OC_ADMIN_CLIENT_SECRET'),
    requireEnv('OC_ADMIN_CLIENT_ID'),
  );
  if (!resp.access_token) throw new Error('OC admin auth returned no access_token');

  cachedToken = resp.access_token;
  cachedExpiresAt = Date.now() + (resp.expires_in - 60) * 1000;
  return cachedToken;
}

function ensureConfigured() {
  if (configured) return;
  Configuration.Set({
    baseApiUrl: requireEnv('OC_API_URL'),
    timeoutInMilliseconds: TIMEOUT_MS,
    clientID: requireEnv('OC_ADMIN_CLIENT_ID'),
  });
  configured = true;
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}
