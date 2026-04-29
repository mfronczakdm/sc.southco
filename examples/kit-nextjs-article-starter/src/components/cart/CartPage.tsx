import {
  ComponentRendering,
  Page,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import CartContents, { CartContentsSkeleton } from './CartContents';

type CartPageFields = {
  Title?: TextField;
  EmptyMessage?: TextField;
  CheckoutButtonLabel?: TextField;
};

type CartPageProps = {
  rendering: ComponentRendering & { fields?: CartPageFields };
  fields?: CartPageFields;
  page?: Page;
};

export default function CartPage(props: CartPageProps) {
  const routeFields = props.page?.layout?.sitecore?.route?.fields as
    | CartPageFields
    | undefined;
  const fields = routeFields ?? props.fields ?? props.rendering?.fields ?? {};

  const isEditing = props.page?.mode?.isEditing === true;
  const checkoutLabel = fieldString(fields.CheckoutButtonLabel) || 'Proceed to Checkout';
  const emptyMessage = fieldString(fields.EmptyMessage) || 'Your cart is empty.';

  return (
    <article className="bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {fields.Title && (
          <Text
            tag="h1"
            field={fields.Title}
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-8"
          />
        )}

        {isEditing ? (
          <CartContentsSkeleton />
        ) : (
          <CartContents checkoutLabel={checkoutLabel} emptyMessage={emptyMessage} />
        )}
      </div>
    </article>
  );
}

function fieldString(field: TextField | undefined): string {
  return typeof field?.value === 'string' ? field.value : '';
}
