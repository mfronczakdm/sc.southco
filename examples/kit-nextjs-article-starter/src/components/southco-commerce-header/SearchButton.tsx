'use client';

export default function SearchButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Search"
      onClick={() => {}}
      className={`p-2 rounded-md text-slate-700 hover:text-[#c8102e] hover:bg-slate-100 transition-colors ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    </button>
  );
}
