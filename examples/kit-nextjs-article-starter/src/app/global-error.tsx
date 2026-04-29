'use client';
import Link from 'next/link';

export default function GlobalError() {
  return (
    <html>
      <body>
        <div style={{ padding: 10 }}>
          <h1>500 Internal Server Error</h1>
          <p>There is a problem with the resource you are looking for, and it cannot be displayed.</p>
          <Link href="/">Go to the Home page</Link>
        </div>
      </body>
    </html>
  );
}
