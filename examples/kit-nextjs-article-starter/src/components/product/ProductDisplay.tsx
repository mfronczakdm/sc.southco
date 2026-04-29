import Link from 'next/link';
import {
  ComponentRendering,
  ImageField,
  NextImage,
  Page,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { parseSpecs, splitBreadcrumb, splitLines } from './lib';
import AddToCartButton, { AddToCartSkeleton } from './AddToCartButton';
import { breadcrumbCategoryUrls } from 'components/commerce/category-urls';
import { getBuyerProduct } from 'lib/ordercloud/catalog';

type ProductFields = {
  Title?: TextField;
  PartNumber?: TextField;
  ShortDescription?: TextField;
  LongDescription?: RichTextField;
  BulletSpecs?: TextField;
  TechnicalSpecifications?: TextField;
  HeroImage?: ImageField;
  Datasheet?: TextField;
  Category?: TextField;
  OcProductID?: TextField;
};

type ProductDisplayProps = {
  rendering: ComponentRendering & { fields?: ProductFields };
  fields?: ProductFields;
  page?: Page;
};

export default async function ProductDisplay(props: ProductDisplayProps) {
  const routeFields = props.page?.layout?.sitecore?.route?.fields as
    | ProductFields
    | undefined;
  const fields = routeFields ?? props.fields ?? props.rendering?.fields ?? {};

  const partNumber = fieldString(fields.PartNumber);
  const datasheetUrl = fieldString(fields.Datasheet);
  const breadcrumb = splitBreadcrumb(fieldString(fields.Category));
  const breadcrumbUrls = breadcrumbCategoryUrls(breadcrumb);
  const specs = parseSpecs(fieldString(fields.TechnicalSpecifications));
  const bullets = splitLines(fieldString(fields.BulletSpecs));
  const heroSrc = fields.HeroImage?.value?.src;
  const ocProductId = fieldString(fields.OcProductID);
  const isEditing = props.page?.mode?.isEditing === true;

  const ocProduct = ocProductId ? await getBuyerProduct(ocProductId) : undefined;
  const priceBreak = ocProduct?.PriceSchedule?.PriceBreaks?.[0];
  const price = typeof priceBreak?.Price === 'number' ? priceBreak.Price : undefined;
  const currency = ocProduct?.PriceSchedule?.Currency ?? 'USD';

  return (
    <article className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/" className="hover:text-[#c8102e]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="#" className="hover:text-[#c8102e]">Shop</Link></li>
            {breadcrumb.map((crumb, i) => (
              <span key={crumb} className="contents">
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={breadcrumbUrls[i]}
                    className="hover:text-[#c8102e] last:text-slate-700"
                  >
                    {crumb}
                  </Link>
                </li>
              </span>
            ))}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {heroSrc && (
            <div className="bg-white rounded-lg p-6 flex items-center justify-center">
              <NextImage
                field={fields.HeroImage}
                width={1000}
                height={1000}
                className="w-full h-auto max-w-md object-contain"
              />
            </div>
          )}

          <div className={heroSrc ? '' : 'lg:col-span-2'}>
            {partNumber && (
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">
                Part #: <span className="text-slate-700 font-medium">{partNumber}</span>
              </div>
            )}

            {fields.Title && (
              <Text
                tag="h1"
                field={fields.Title}
                className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900"
              />
            )}

            {price !== undefined && (
              <div className="mt-4 text-3xl font-semibold text-slate-900 tabular-nums">
                {formatMoney(price, currency)}
              </div>
            )}

            {fields.ShortDescription && (
              <div className="mt-4 text-lg text-slate-600">
                <Text field={fields.ShortDescription} />
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {isEditing ? (
                <AddToCartSkeleton />
              ) : (
                ocProductId && <AddToCartButton ocProductId={ocProductId} />
              )}
            {datasheetUrl && (
              <a
                href={datasheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#c8102e] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#a30d26] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Datasheet
              </a>
            )}
            </div>
          </div>
        </div>

        {hasRichTextValue(fields.LongDescription) && (
          <section className="mt-12">
            <SectionHeading>Description</SectionHeading>
            <div className="prose max-w-none text-slate-700 leading-relaxed">
              <RichText field={fields.LongDescription} />
            </div>
          </section>
        )}

        {specs.length > 0 && (
          <section className="mt-12">
            <SectionHeading>Specifications</SectionHeading>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
              {specs.map(([key, val]) => (
                <div
                  key={key}
                  className="flex justify-between gap-4 border-b border-slate-100 py-2.5"
                >
                  <dt className="text-sm text-slate-500">{key}</dt>
                  <dd className="text-sm text-slate-800 font-medium text-right">{val}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {bullets.length > 0 && (
          <section className="mt-12">
            <SectionHeading>Features</SectionHeading>
            <ul className="list-disc list-inside space-y-1.5 text-slate-700">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight text-slate-900 border-b-2 border-[#c8102e] inline-block pb-1 mb-4">
      {children}
    </h2>
  );
}

function fieldString(field: TextField | undefined): string {
  return typeof field?.value === 'string' ? field.value : '';
}

function formatMoney(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  } catch {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
}

function hasRichTextValue(field: RichTextField | undefined): boolean {
  return typeof field?.value === 'string' && field.value.trim().length > 0;
}
