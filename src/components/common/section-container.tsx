import React from "react";

interface SectionContainerProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function SectionContainer({
  title,
  children,
  action,
}: SectionContainerProps) {
  return (
    <section className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        {action && <div>{action}</div>}
      </div>
      {children}
    </section>
  );
}
