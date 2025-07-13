import { ROUTE_LABELS } from "@/constants/routes";
import { useLocation, useParams } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

function getLabel(segment: string, params: Record<string, string>) {
  // If it's a param (e.g. :id), show the value
  if (Object.values(params).includes(segment)) return segment;
  return (
    ROUTE_LABELS[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
  );
}

export function DynamicBreadcrumbs() {
  const location = useLocation();
  const paramsRaw = useParams();
  // Convert params to Record<string, string>
  const params: Record<string, string> = Object.fromEntries(
    Object.entries(paramsRaw).map(([k, v]) => [k, v ?? ""])
  );
  const segments = location.pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  let path = "";
  const items = segments.map((segment, idx) => {
    path += "/" + segment;
    const isLast = idx === segments.length - 1;
    const label = getLabel(segment, params);
    return {
      label,
      href: isLast ? undefined : path,
      isLast,
    };
  });

  // Always add Dashboard as the first item
  const fullItems = [
    {
      label: ROUTE_LABELS["dashboard"],
      href: "/",
      isLast: segments.length === 0,
    },
    ...items,
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {fullItems.map((item, idx) => (
          <>
            {idx > 0 && <BreadcrumbSeparator key={`sep-${idx}`} />}
            <BreadcrumbItem key={item.href || item.label}>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
