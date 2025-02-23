"use client";  

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`bg-white shadow-md p-4 rounded-lg ${className}`}>{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="p-4 border-b">{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={`text-2xl font-bold text-center ${className}`}>{children}</h2>;
}

