import { NextRequest, NextResponse } from 'next/server';
import { Payments, type OrderWorksheet } from 'ordercloud-javascript-sdk';
import { getAdminToken } from 'lib/ordercloud/admin';

interface OrderSubmitRequest {
  OrderWorksheet: OrderWorksheet;
}

interface OrderSubmitResponse {
  HttpStatusCode: number;
  Succeeded: boolean;
}

// TODO: verify the IntegrationEvent HashKey signature on incoming requests.
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderSubmitRequest;
    const orderId = body.OrderWorksheet?.Order?.ID;
    if (!orderId) {
      return NextResponse.json(
        {
          Succeeded: false,
          HttpStatusCode: 400,
          Errors: [{ ErrorCode: 'MissingOrderId', Message: 'Order.ID is required' }],
        },
        { status: 400 },
      );
    }

    const token = await getAdminToken();
    const payments = await Payments.List('All', orderId, undefined, { accessToken: token });
    const purchaseOrder = payments.Items?.find((p) => p.Type === 'PurchaseOrder');
    if (!purchaseOrder) {
      return NextResponse.json(
        {
          Succeeded: false,
          HttpStatusCode: 400,
          Errors: [
            { ErrorCode: 'MissingPurchaseOrderPayment', Message: 'A PurchaseOrder payment is required to submit' },
          ],
        },
        { status: 400 },
      );
    }

    const response: OrderSubmitResponse = {
      Succeeded: true,
      HttpStatusCode: 200,
    };
    return NextResponse.json(response);
  } catch (err) {
    console.error('[checkoutIntegration/ordersubmit] error:', err);
    return NextResponse.json(
      { Succeeded: false, HttpStatusCode: 500 },
      { status: 500 },
    );
  }
}
