import Image from 'next/image';
import { FOOTER_COLUMNS, LEGAL_LINKS } from './footer-links';

const LOGO = {
  src: 'https://edge.sitecorecloud.io/xcentium555c-southco06d0-dev1169-14e7/media/Project/southco/southco/Southco-Logo-RGB-160x36.jpg',
  width: 160,
  height: 36,
  alt: 'Southco',
};

export default function SouthCoCommerceFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="h-1 bg-[#c8102e]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="inline-block bg-white rounded-md p-3">
              <Image
                src={LOGO.src}
                width={LOGO.width}
                height={LOGO.height}
                alt={LOGO.alt}
                className="h-8 w-auto"
              />
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-xs">
              Engineered access hardware solutions for industries worldwide.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-[#c8102e] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {year} Southco, Inc. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs text-slate-500 hover:text-[#c8102e] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
