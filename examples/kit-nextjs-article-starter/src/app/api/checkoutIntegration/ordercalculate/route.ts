import { NextRequest, NextResponse } from 'next/server';
import type { OrderWorksheet } from 'ordercloud-javascript-sdk';

// TODO: replace with real tax logic (provider lookup, jurisdiction rules, etc.)
const TAX_RATE = 0.05;

interface OrderCalculateRequest {
  OrderWorksheet: OrderWorksheet;
}

interface OrderCalculateResponse {
  TaxTotal: number;
  HttpStatusCode: number;
  Succeeded: boolean;
}

// TODO: verify the IntegrationEvent HashKey signature on incoming requests.
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderCalculateRequest;
    const subtotal = body.OrderWorksheet?.Order?.Subtotal;
    if (subtotal == null) {
      return NextResponse.json(
        {
          Succeeded: false,
          HttpStatusCode: 400,
          Errors: [{ ErrorCode: 'MissingSubtotal', Message: 'Order.Subtotal is required' }],
        },
        { status: 400 },
      );
    }

    const response: OrderCalculateResponse = {
      TaxTotal: subtotal * TAX_RATE,
      HttpStatusCode: 200,
      Succeeded: true,
    };
    return NextResponse.json(response);
  } catch (err) {
    console.error('[checkoutIntegration/ordercalculate] error:', err);
    return NextResponse.json(
      { Succeeded: false, HttpStatusCode: 500 },
      { status: 500 },
    );
  }
}
