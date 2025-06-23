import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

interface NotificationIconProps {
  count?: number;
  className?: string;
  showBadge?: boolean;
}

export function NotificationIcon({
  count = 0,
  className = "",
  showBadge = true,
}: NotificationIconProps) {
  return (
    <div className={`relative inline-flex ${className}`}>
      <Bell className="h-5 w-5" />
      {showBadge && count > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs font-medium min-w-[20px] rounded-full"
        >
          {count > 9 ? "9+" : count}
        </Badge>
      )}
    </div>
  );
}
