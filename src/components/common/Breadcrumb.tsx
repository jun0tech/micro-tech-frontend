import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      className={`flex items-center text-sm mb-6 ${className}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400 flex-shrink-0" />
          )}
          {item.href ? (
            <Link
              to={item.href}
              className="text-gray-500 hover:text-gray-700 truncate"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium truncate">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
