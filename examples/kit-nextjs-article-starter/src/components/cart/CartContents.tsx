'use client';

import { useEffect, useState } from 'react';
import { CART_UPDATED_EVENT, type CartUpdatedDetail } from 'components/commerce/cart-events';

type LineItem = {
  ID?: string;
  ProductID?: string;
  Quantity?: number;
  UnitPrice?: number;
  LineSubtotal?: number;
  Product?: { Name?: string; xp?: { ImageUrl?: string } };
};

type CartResponse = { count: number; items: LineItem[] };

type Props = {
  checkoutLabel: string;
  emptyMessage: string;
};

export default function CartContents({ checkoutLabel, emptyMessage }: Props) {
  const [items, setItems] = useState<LineItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCart().then((data) => {
      if (!cancelled && data) setItems(data.items);
    });

    function onUpdated(_e: Event) {
      fetchCart().then((data) => {
        if (!cancelled && data) setItems(data.items);
      });
    }
    window.addEventListener(CART_UPDATED_EVENT, onUpdated);
    return () => {
      cancelled = true;
      window.removeEventListener(CART_UPDATED_EVENT, onUpdated);
    };
  }, []);

  if (items === null) return <CartContentsSkeleton />;

  if (items.length === 0) {
    return (
      <div className="border border-slate-200 rounded-lg p-8 text-center text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  const subtotal = items.reduce((sum, li) => sum + (li.LineSubtotal ?? 0), 0);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <ul className="divide-y divide-slate-200">
        {items.map((li) => {
          const imageUrl = li.Product?.xp?.ImageUrl;
          return (
            <li key={li.ID ?? li.ProductID} className="flex items-center gap-4 p-4">
              <div className="shrink-0 w-20 h-20 rounded-md bg-slate-100 overflow-hidden flex items-center justify-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                ) : null}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 truncate">
                  {li.Product?.Name ?? li.ProductID}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Qty {li.Quantity ?? 0} &middot; {formatMoney(li.UnitPrice)} ea.
                </div>
              </div>
              <div className="text-sm font-medium text-slate-900 whitespace-nowrap">
                {formatMoney(li.LineSubtotal)}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between bg-slate-50 px-4 py-3 border-t border-slate-200">
        <span className="text-sm text-slate-600">Subtotal</span>
        <span className="text-base font-semibold text-slate-900">{formatMoney(subtotal)}</span>
      </div>
      <div className="px-4 py-3 border-t border-slate-200">
        <button
          type="button"
          className="w-full inline-flex items-center justify-center rounded-md bg-[#c8102e] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#a30d26] transition-colors"
        >
          {checkoutLabel}
        </button>
      </div>
    </div>
  );
}

export function CartContentsSkeleton() {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <ul className="divide-y divide-slate-200">
        {[0, 1].map((i) => (
          <li key={i} className="flex items-center justify-between p-4">
            <div className="space-y-2">
              <div className="h-4 w-48 rounded bg-slate-200 animate-pulse" />
              <div className="h-3 w-24 rounded bg-slate-100 animate-pulse" />
            </div>
            <div className="h-4 w-16 rounded bg-slate-200 animate-pulse" />
          </li>
        ))}
      </ul>
      <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between">
        <div className="h-4 w-16 rounded bg-slate-200 animate-pulse" />
        <div className="h-5 w-20 rounded bg-slate-200 animate-pulse" />
      </div>
      <div className="px-4 py-3 border-t border-slate-200">
        <div className="h-10 w-full rounded-md bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
}

async function fetchCart(): Promise<CartResponse | null> {
  try {
    const r = await fetch('/api/cart', { cache: 'no-store' });
    if (!r.ok) return null;
    return (await r.json()) as CartResponse;
  } catch {
    return null;
  }
}

function formatMoney(value: number | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
