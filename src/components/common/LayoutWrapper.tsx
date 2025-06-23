import { AppSidebar } from "@/components/layout/AppSidebar";
import { Navbar } from "@/components/layout/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils"; // Assuming shadcn's utility for className merging
import { Outlet } from "react-router";

const LayoutWrapper = ({ className }: { className?: string }) => {
  return (
    <SidebarProvider>
      <div className={cn("flex w-full", className)}>
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content with Navbar */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main
            className={cn(
              "container mx-auto px-4 py-6 sm:px-6 lg:px-8",
              "max-w-[1300px]",
              "flex-1 relative z-10" // Added z-index to keep content above decorations
            )}
          >
            <Outlet />
          </main>
          <footer className="bg-sidebar text-sidebar-foreground py-4 text-center text-sm relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              &copy; {new Date().getFullYear()} MicroTech IMS
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LayoutWrapper;
