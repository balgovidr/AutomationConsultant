'use client';

export default function RootLayout({ children }) {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200">
        {children}
      </div>
    </div>
  );
}
