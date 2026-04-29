'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CART_UPDATED_EVENT,
  emitCartUpdated,
  type CartUpdatedDetail,
} from 'components/commerce/cart-events';

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
  className?: string;
  disabled?: boolean;
};

export default function MiniCart({ className = '', disabled = false }: Props) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<LineItem[]>([]);
  const [open, setOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const lastFromEvent = useRef(false);

  const refresh = useCallback(async () => {
    try {
      const r = await fetch('/api/cart', { cache: 'no-store' });
      if (!r.ok) return;
      const data = (await r.json()) as CartResponse;
      setItems(data.items ?? []);
      setCount(data.count ?? 0);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (disabled) return;
    refresh();

    function onUpdated(e: Event) {
      const ce = e as CustomEvent<CartUpdatedDetail>;
      if (typeof ce.detail?.count === 'number') {
        setCount(ce.detail.count);
        // Skip the refresh if WE just emitted it (we already have fresh items).
        if (lastFromEvent.current) {
          lastFromEvent.current = false;
          return;
        }
      }
      refresh();
    }
    window.addEventListener(CART_UPDATED_EVENT, onUpdated);
    return () => window.removeEventListener(CART_UPDATED_EVENT, onUpdated);
  }, [disabled, refresh]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  async function applyMutation(id: string, init: RequestInit) {
    setPendingId(id);
    try {
      const r = await fetch(`/api/cart/items/${encodeURIComponent(id)}`, init);
      if (!r.ok) return;
      const data = (await r.json()) as CartResponse;
      setItems(data.items ?? []);
      setCount(data.count ?? 0);
      lastFromEvent.current = true;
      emitCartUpdated(data.count ?? 0);
    } finally {
      setPendingId(null);
    }
  }

  function updateQty(li: LineItem, qty: number) {
    if (!li.ID) return;
    if (qty < 1) {
      applyMutation(li.ID, { method: 'DELETE' });
      return;
    }
    applyMutation(li.ID, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ quantity: qty }),
    });
  }

  function remove(li: LineItem) {
    if (!li.ID) return;
    applyMutation(li.ID, { method: 'DELETE' });
  }

  const subtotal = items.reduce((sum, li) => sum + (li.LineSubtotal ?? 0), 0);

  return (
    <>
      <button
        type="button"
        aria-label={`Cart, ${count} items`}
        aria-haspopup="dialog"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen(true)}
        className={`relative p-2 rounded-md text-slate-700 hover:text-[#c8102e] hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-700 ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
        </svg>
        {!disabled && count > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#c8102e] text-white text-[10px] font-semibold flex items-center justify-center leading-none"
            aria-hidden="true"
          >
            {count}
          </span>
        )}
      </button>

      {!disabled && (
        <div
          className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}
          aria-hidden={!open}
        >
          <div
            className={`absolute inset-0 bg-slate-900/40 transition-opacity ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setOpen(false)}
          />
          <aside
            role="dialog"
            aria-label="Shopping cart"
            className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col transition-transform ${
              open ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <header className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-900">
                Cart {count > 0 && <span className="text-slate-500 font-normal">({count})</span>}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  Your cart is empty.
                </div>
              ) : (
                <ul className="divide-y divide-slate-200">
                  {items.map((li) => {
                    const id = li.ID ?? '';
                    const isPending = pendingId === id;
                    const imageUrl = li.Product?.xp?.ImageUrl;
                    return (
                      <li key={id || li.ProductID} className="p-4">
                        <div className="flex gap-3">
                          <div className="shrink-0 w-16 h-16 rounded-md bg-slate-100 overflow-hidden flex items-center justify-center">
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
                          <div className="flex-1 min-w-0 flex justify-between gap-4">
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-slate-900 truncate">
                                {li.Product?.Name ?? li.ProductID}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">
                                {formatMoney(li.UnitPrice)} each
                              </div>
                            </div>
                            <div className="text-sm font-medium text-slate-900 whitespace-nowrap">
                              {formatMoney(li.LineSubtotal)}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-slate-300 rounded-md">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              disabled={isPending}
                              onClick={() => updateQty(li, (li.Quantity ?? 1) - 1)}
                              className="px-2 py-1 text-slate-700 hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              −
                            </button>
                            <span className="px-3 text-sm tabular-nums">
                              {li.Quantity ?? 0}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              disabled={isPending}
                              onClick={() => updateQty(li, (li.Quantity ?? 0) + 1)}
                              className="px-2 py-1 text-slate-700 hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => remove(li)}
                            className="text-xs text-slate-500 hover:text-red-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <footer className="border-t border-slate-200 px-4 py-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Subtotal</span>
                <span className="text-base font-semibold text-slate-900">
                  {formatMoney(subtotal)}
                </span>
              </div>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="block w-full text-center rounded-md bg-[#c8102e] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#a30d26] transition-colors cursor-pointer"
              >
                View Cart
              </Link>
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}

function formatMoney(value: number | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
