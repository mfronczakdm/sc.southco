export type FooterLink = { label: string; href: string };
export type FooterColumn = { heading: string; links: FooterLink[] };

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Products',
    links: [
      { label: 'Latches', href: '#' },
      { label: 'Hinges', href: '#' },
      { label: 'Electronic Access', href: '#' },
      { label: 'Captive Fasteners', href: '#' },
      { label: 'Handles', href: '#' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Data Center', href: '#' },
      { label: 'Industrial Machinery', href: '#' },
      { label: 'Transportation', href: '#' },
      { label: 'Healthcare', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'CAD Models', href: '#' },
      { label: 'Catalogs', href: '#' },
      { label: 'Technical Support', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Southco', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Newsroom', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

export const LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
  { label: 'Cookie Settings', href: '#' },
];
