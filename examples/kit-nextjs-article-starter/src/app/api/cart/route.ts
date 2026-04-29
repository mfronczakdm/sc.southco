import { NextResponse } from 'next/server';
import { Cart, type LineItem } from 'ordercloud-javascript-sdk';
import { getAnonToken } from 'lib/ordercloud/anon';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const accessToken = await getAnonToken();
    const list = await Cart.ListLineItems<LineItem>({ pageSize: 100 }, { accessToken });
    const items = list.Items ?? [];
    const count = items.reduce((sum, li) => sum + (li.Quantity ?? 0), 0);
    return NextResponse.json({ count, items });
  } catch (err) {
    console.error('[api/cart] GET failed:', describe(err));
    return NextResponse.json({ count: 0, items: [] });
  }
}

function describe(err: unknown): string {
  const e = err as { message?: string; response?: { data?: unknown; status?: number } };
  const status = e?.response?.status ? `${e.response.status} ` : '';
  if (e?.response?.data) {
    return `${status}${e.message ?? ''} :: ${JSON.stringify(e.response.data)}`;
  }
  return `${status}${e?.message ?? String(err)}`;
}
