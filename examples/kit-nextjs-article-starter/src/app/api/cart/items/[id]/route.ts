import { NextRequest, NextResponse } from 'next/server';
import { Cart, type LineItem } from 'ordercloud-javascript-sdk';
import { getAnonToken } from 'lib/ordercloud/anon';

export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await req.json().catch(() => ({}))) as { quantity?: number };
    const quantity = Math.max(1, Math.floor(Number(body.quantity ?? 0)) || 0);
    if (!quantity) {
      return NextResponse.json({ error: 'quantity must be >= 1' }, { status: 400 });
    }

    const accessToken = await getAnonToken();
    await Cart.PatchLineItem(id, { Quantity: quantity }, { accessToken });
    return NextResponse.json(await summarize(accessToken));
  } catch (err) {
    console.error('[api/cart/items/:id] PATCH failed:', describe(err));
    return NextResponse.json({ error: 'failed to update line item' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const accessToken = await getAnonToken();
    await Cart.DeleteLineItem(id, { accessToken });
    return NextResponse.json(await summarize(accessToken));
  } catch (err) {
    console.error('[api/cart/items/:id] DELETE failed:', describe(err));
    return NextResponse.json({ error: 'failed to remove line item' }, { status: 500 });
  }
}

async function summarize(accessToken: string) {
  const list = await Cart.ListLineItems<LineItem>({ pageSize: 100 }, { accessToken });
  const items = list.Items ?? [];
  const count = items.reduce((sum, li) => sum + (li.Quantity ?? 0), 0);
  return { count, items };
}

function describe(err: unknown): string {
  const e = err as { message?: string; response?: { data?: unknown; status?: number } };
  const status = e?.response?.status ? `${e.response.status} ` : '';
  if (e?.response?.data) {
    return `${status}${e.message ?? ''} :: ${JSON.stringify(e.response.data)}`;
  }
  return `${status}${e?.message ?? String(err)}`;
}
