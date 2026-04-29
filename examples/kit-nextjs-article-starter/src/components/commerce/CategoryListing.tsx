import Link from 'next/link';
import {
  ComponentRendering,
  Page,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import {
  listProductsInCategory,
  listSubcategories,
  listTopLevelCategories,
  type BrowseCategory,
  type BrowseProduct,
} from 'lib/ordercloud/catalog';
import { categoryUrl, productUrl } from './category-urls';

type CategoryFields = {
  Title?: TextField;
  OcCategoryID?: TextField;
};

type CategoryListingProps = {
  rendering: ComponentRendering & { fields?: CategoryFields };
  fields?: CategoryFields;
  page?: Page;
};

export default async function CategoryListing(props: CategoryListingProps) {
  const routeFields = props.page?.layout?.sitecore?.route?.fields as
    | CategoryFields
    | undefined;
  const fields = routeFields ?? props.fields ?? props.rendering?.fields ?? {};

  const ocCategoryId = fieldString(fields.OcCategoryID);
  const isEditing = props.page?.mode?.isEditing === true;

  let subcategories: BrowseCategory[] = [];
  let products: BrowseProduct[] = [];
  let loadError: string | null = null;

  if (!isEditing) {
    try {
      if (ocCategoryId) {
        // Direct children only: products in this dataset are assigned to leaf
        // categories, and product URLs are built relative to the current category,
        // so going deeper than 1 would produce links that don't match the Sitecore
        // route tree. Drill-down via subcategories surfaces deeper products.
        const [subs, prods] = await Promise.all([
          listSubcategories(ocCategoryId),
          listProductsInCategory(ocCategoryId, '1'),
        ]);
        subcategories = subs;
        products = prods;
      } else {
        // Shop root — no OC category bound; show top-level categories as the drill-down.
        subcategories = await listTopLevelCategories();
      }
    } catch (err) {
      loadError = err instanceof Error ? err.message : 'failed to load catalog';
    }
  }

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          {fields.Title ? (
            <Text
              tag="h1"
              field={fields.Title}
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900"
            />
          ) : (
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              Shop
            </h1>
          )}
        </header>

        {loadError && (
          <p className="mb-6 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Could not load catalog: {loadError}
          </p>
        )}

        {subcategories.length > 0 && (
          <CategoryGrid heading="Categories" categories={subcategories} />
        )}

        {products.length > 0 && (
          <ProductGrid
            heading={subcategories.length > 0 ? 'Products' : undefined}
            products={products}
            ocCategoryId={ocCategoryId}
          />
        )}

        {!isEditing && !loadError && subcategories.length === 0 && products.length === 0 && (
          <p className="text-sm text-slate-500">Nothing to show here yet.</p>
        )}
      </div>
    </section>
  );
}

function CategoryGrid({
  heading,
  categories,
}: {
  heading: string;
  categories: BrowseCategory[];
}) {
  return (
    <section className="mb-12">
      <SectionHeading>{heading}</SectionHeading>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <li key={cat.ID}>
            <Link
              href={categoryUrl(cat.ID ?? '')}
              className="block border border-slate-200 rounded-lg p-4 hover:border-[#c8102e] hover:shadow-sm transition"
            >
              <div className="text-base font-medium text-slate-900">{cat.Name}</div>
              {cat.Description && (
                <p className="mt-1 text-sm text-slate-500 line-clamp-2">{cat.Description}</p>
              )}
              <div className="mt-2 text-xs text-[#c8102e]">Browse →</div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductGrid({
  heading,
  products,
  ocCategoryId,
}: {
  heading?: string;
  products: BrowseProduct[];
  ocCategoryId: string;
}) {
  return (
    <section>
      {heading && <SectionHeading>{heading}</SectionHeading>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((p) => {
          const id = p.ID ?? '';
          const price = p.PriceSchedule?.PriceBreaks?.[0]?.Price;
          const imageUrl = p.xp?.ImageUrl;
          return (
            <li key={id}>
              <Link
                href={productUrl(ocCategoryId || id, id)}
                className="block border border-slate-200 rounded-lg overflow-hidden hover:border-[#c8102e] hover:shadow-sm transition"
              >
                <div className="aspect-square bg-slate-50 flex items-center justify-center">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt={p.Name ?? id}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">No image</span>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium text-slate-900 line-clamp-2">{p.Name}</div>
                  {typeof price === 'number' && (
                    <div className="mt-1 text-sm text-slate-700">${price.toFixed(2)}</div>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight text-slate-900 border-b-2 border-[#c8102e] inline-block pb-1 mb-4">
      {children}
    </h2>
  );
}

function fieldString(field: TextField | undefined): string {
  return typeof field?.value === 'string' ? field.value : '';
}
