import 'server-only';
import { cookies } from 'next/headers';
import { Auth, Configuration } from 'ordercloud-javascript-sdk';

const TOKEN_COOKIE = 'oc_anon_token';
const EXPIRES_COOKIE = 'oc_anon_expires';
const TIMEOUT_MS = 30 * 1000;
// Anon token tied to the cart in OC, so don't refresh until the SDK says it's expired.
// Subtract a small skew so we re-auth slightly before the actual expiry.
const EXPIRY_SKEW_SECONDS = 60;

let configured = false;

export async function getAnonToken(): Promise<string> {
  ensureConfigured();
  const store = await cookies();
  const existing = store.get(TOKEN_COOKIE)?.value;
  const expiresAt = Number(store.get(EXPIRES_COOKIE)?.value ?? 0);
  if (existing && expiresAt > Date.now()) return existing;

  const resp = await Auth.Anonymous(requireEnv('OC_ANON_CLIENT_ID'));
  if (!resp.access_token) throw new Error('OC anon auth returned no access_token');

  const newExpiresAt = Date.now() + (resp.expires_in - EXPIRY_SKEW_SECONDS) * 1000;
  const cookieOpts = {
    httpOnly: true,
    sameSite: 'lax' as const,
    path: '/',
    expires: new Date(newExpiresAt),
  };
  store.set(TOKEN_COOKIE, resp.access_token, cookieOpts);
  store.set(EXPIRES_COOKIE, String(newExpiresAt), cookieOpts);

  return resp.access_token;
}

function ensureConfigured(): void {
  if (configured) return;
  Configuration.Set({
    baseApiUrl: requireEnv('OC_API_URL'),
    timeoutInMilliseconds: TIMEOUT_MS,
    clientID: requireEnv('OC_ANON_CLIENT_ID'),
  });
  configured = true;
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}
