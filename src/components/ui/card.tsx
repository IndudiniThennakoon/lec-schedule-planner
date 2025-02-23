"use client";  

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`bg-white shadow-md p-4 rounded-lg ${className}`}>{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}
