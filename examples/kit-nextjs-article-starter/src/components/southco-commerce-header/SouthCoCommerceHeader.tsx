import Image from 'next/image';
import Link from 'next/link';
import { listTopLevelCategories } from 'lib/ordercloud/catalog';
import { categoryUrl } from 'components/commerce/category-urls';
import { STATIC_NAV_ITEMS, type NavItem } from './nav-items';
import SearchButton from './SearchButton';
import MiniCart from './MiniCart';
import MobileNav from './MobileNav';

const LOGO = {
  src: 'https://edge.sitecorecloud.io/xcentium555c-southco06d0-dev1169-14e7/media/Project/southco/southco/Southco-Logo-RGB-160x36.jpg',
  width: 160,
  height: 36,
  alt: 'Southco',
};

export default async function SouthCoCommerceHeader({
  isPreviewMode = false,
}: {
  isPreviewMode?: boolean;
}) {
  const navItems = await loadNavItems();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          <a href="#" className="flex items-center shrink-0" aria-label="Southco home">
            <Image
              src={LOGO.src}
              width={LOGO.width}
              height={LOGO.height}
              alt={LOGO.alt}
              priority
              className="h-7 sm:h-9 w-auto"
            />
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-slate-700 hover:text-[#c8102e] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <SearchButton />
            <MiniCart disabled={isPreviewMode} />
            <MobileNav items={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
}

async function loadNavItems(): Promise<NavItem[]> {
  let categoryItems: NavItem[] = [];
  try {
    const categories = await listTopLevelCategories();
    categoryItems = categories
      .filter((c) => c.ID && c.Name)
      .map((c) => ({
        label: c.Name as string,
        href: categoryUrl(c.ID as string),
      }));
  } catch (err) {
    console.warn(
      '[SouthCoCommerceHeader] failed to load OC categories:',
      (err as Error).message
    );
  }
  return [...categoryItems, ...STATIC_NAV_ITEMS];
}
