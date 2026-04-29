import { NextRequest, NextResponse } from 'next/server';
import { Cart, type LineItem } from 'ordercloud-javascript-sdk';
import { getAnonToken } from 'lib/ordercloud/anon';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      productId?: string;
      quantity?: number;
    };
    const productId = String(body.productId ?? '').trim();
    const quantity = Math.max(1, Math.floor(Number(body.quantity ?? 1)) || 1);
    if (!productId) {
      return NextResponse.json({ error: 'productId required' }, { status: 400 });
    }

    const accessToken = await getAnonToken();
    await Cart.CreateLineItem({ ProductID: productId, Quantity: quantity }, { accessToken });

    const list = await Cart.ListLineItems<LineItem>({ pageSize: 100 }, { accessToken });
    const items = list.Items ?? [];
    const count = items.reduce((sum, li) => sum + (li.Quantity ?? 0), 0);
    return NextResponse.json({ count });
  } catch (err) {
    console.error('[api/cart/items] POST failed:', describe(err));
    return NextResponse.json({ error: 'failed to add to cart' }, { status: 500 });
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
