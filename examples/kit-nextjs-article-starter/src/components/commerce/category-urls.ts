const SHOP_SEGMENT = 'shop';

export function ocCategoryPath(ocCategoryId: string): string {
  return ocCategoryId.split('_').filter(Boolean).join('/');
}

export function categoryUrl(ocCategoryId: string): string {
  return `/${SHOP_SEGMENT}/${ocCategoryPath(ocCategoryId)}`;
}

export function productUrl(ocCategoryId: string, productId: string): string {
  return `${categoryUrl(ocCategoryId)}/${productId}`;
}

// Mirror of the import-time slug rules in scripts/import-southco/sitecore-paths.ts.
// OC category IDs are built from these same slugs joined with `_`, so a breadcrumb
// of names → URL chain only stays consistent if both ends slugify identically.
export function categorySlug(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/®|©|™/g, '')
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

export function breadcrumbCategoryUrls(names: string[]): string[] {
  const path: string[] = [];
  return names.map((n) => {
    const slug = categorySlug(n);
    if (slug) path.push(slug);
    return `/${SHOP_SEGMENT}/${path.join('/')}`;
  });
}
