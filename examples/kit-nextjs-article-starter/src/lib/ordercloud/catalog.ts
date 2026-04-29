import 'server-only';
import {
  Auth,
  Configuration,
  Me,
  type BuyerProduct,
  type Category,
  type Filters,
} from 'ordercloud-javascript-sdk';

const TIMEOUT_MS = 30 * 1000;
const TOKEN_SKEW_SECONDS = 60;

let configured = false;
let cachedToken: string | undefined;
let cachedExpiresAt = 0;

export type BrowseProduct = BuyerProduct<{ ImageUrl?: string }>;
export type BrowseCategory = Category;

export async function listTopLevelCategories(): Promise<BrowseCategory[]> {
  const accessToken = await getBrowseToken();
  const resp = await Me.ListCategories<BrowseCategory>(
    { depth: '1', pageSize: 100 },
    { accessToken },
  );
  return (resp.Items ?? []).filter((c) => c.Active);
}

export async function listSubcategories(parentId: string): Promise<BrowseCategory[]> {
  const accessToken = await getBrowseToken();
  const resp = await Me.ListCategories<BrowseCategory>(
    {
      depth: '1',
      pageSize: 100,
      filters: { ParentID: parentId } as Filters,
    },
    { accessToken },
  );
  return (resp.Items ?? []).filter((c) => c.Active);
}

export async function listProductsInCategory(
  categoryId: string,
  depth: string = 'all',
): Promise<BrowseProduct[]> {
  const accessToken = await getBrowseToken();
  const resp = await Me.ListProducts<BrowseProduct>(
    { categoryID: categoryId, depth, pageSize: 100 },
    { accessToken },
  );
  return (resp.Items ?? []).filter((p) => p.Active);
}

export async function getBuyerProduct(
  productId: string,
): Promise<BrowseProduct | undefined> {
  try {
    const accessToken = await getBrowseToken();
    return await Me.GetProduct<BrowseProduct>(productId, undefined, { accessToken });
  } catch {
    return undefined;
  }
}

async function getBrowseToken(): Promise<string> {
  ensureConfigured();
  if (cachedToken && cachedExpiresAt > Date.now()) return cachedToken;

  const resp = await Auth.Anonymous(requireEnv('OC_ANON_CLIENT_ID'));
  if (!resp.access_token) throw new Error('OC anon auth returned no access_token');

  cachedToken = resp.access_token;
  cachedExpiresAt = Date.now() + (resp.expires_in - TOKEN_SKEW_SECONDS) * 1000;
  return cachedToken;
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
