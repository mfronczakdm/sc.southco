export const CART_UPDATED_EVENT = 'cart:updated';

export type CartUpdatedDetail = { count: number };

export function emitCartUpdated(count: number): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<CartUpdatedDetail>(CART_UPDATED_EVENT, { detail: { count } }),
  );
}
