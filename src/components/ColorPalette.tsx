export function ColorPalette() {
  // CSS Variables with their definitions from :root - using HSL format
  const cssVariables = [
    {
      name: "Background",
      variable: "--background",
      className: "bg-background",
    },
    {
      name: "Foreground",
      variable: "--foreground",
      className: "bg-foreground",
    },
    { name: "Card", variable: "--card", className: "bg-card" },
    {
      name: "Card Foreground",
      variable: "--card-foreground",
      className: "bg-card-foreground",
    },
    { name: "Popover", variable: "--popover", className: "bg-popover" },
    {
      name: "Popover Foreground",
      variable: "--popover-foreground",
      className: "bg-popover-foreground",
    },
    { name: "Primary", variable: "--primary", className: "bg-primary" },
    {
      name: "Primary Foreground",
      variable: "--primary-foreground",
      className: "bg-primary-foreground",
    },
    { name: "Secondary", variable: "--secondary", className: "bg-secondary" },
    {
      name: "Secondary Foreground",
      variable: "--secondary-foreground",
      className: "bg-secondary-foreground",
    },
    { name: "Muted", variable: "--muted", className: "bg-muted" },
    {
      name: "Muted Foreground",
      variable: "--muted-foreground",
      className: "bg-muted-foreground",
    },
    { name: "Accent", variable: "--accent", className: "bg-accent" },
    {
      name: "Accent Foreground",
      variable: "--accent-foreground",
      className: "bg-accent-foreground",
    },
    {
      name: "Destructive",
      variable: "--destructive",
      className: "bg-destructive",
    },
    { name: "Border", variable: "--border", className: "bg-border" },
    { name: "Input", variable: "--input", className: "bg-input" },
    { name: "Ring", variable: "--ring", className: "bg-ring" },
  ];

  // Additional custom colors
  const statusColors = [
    { name: "Success", variable: "--success", className: "bg-success" },
    {
      name: "Success Foreground",
      variable: "--success-foreground",
      className: "bg-success-foreground",
    },
    { name: "Warning", variable: "--warning", className: "bg-warning" },
    {
      name: "Warning Foreground",
      variable: "--warning-foreground",
      className: "bg-warning-foreground",
    },
    { name: "Danger", variable: "--danger", className: "bg-danger" },
    {
      name: "Danger Foreground",
      variable: "--danger-foreground",
      className: "bg-danger-foreground",
    },
    { name: "Info", variable: "--info", className: "bg-info" },
    {
      name: "Info Foreground",
      variable: "--info-foreground",
      className: "bg-info-foreground",
    },
  ];

  // Chart colors
  const chartColors = [
    { name: "Chart 1", variable: "--chart-1", className: "bg-chart-1" },
    { name: "Chart 2", variable: "--chart-2", className: "bg-chart-2" },
    { name: "Chart 3", variable: "--chart-3", className: "bg-chart-3" },
    { name: "Chart 4", variable: "--chart-4", className: "bg-chart-4" },
    { name: "Chart 5", variable: "--chart-5", className: "bg-chart-5" },
  ];

  // Sidebar colors
  const sidebarColors = [
    { name: "Sidebar", variable: "--sidebar", className: "bg-sidebar" },
    {
      name: "Sidebar Foreground",
      variable: "--sidebar-foreground",
      className: "bg-sidebar-foreground",
    },
    {
      name: "Sidebar Primary",
      variable: "--sidebar-primary",
      className: "bg-sidebar-primary",
    },
    {
      name: "Sidebar Primary Foreground",
      variable: "--sidebar-primary-foreground",
      className: "bg-sidebar-primary-foreground",
    },
    {
      name: "Sidebar Accent",
      variable: "--sidebar-accent",
      className: "bg-sidebar-accent",
    },
    {
      name: "Sidebar Accent Foreground",
      variable: "--sidebar-accent-foreground",
      className: "bg-sidebar-accent-foreground",
    },
    {
      name: "Sidebar Border",
      variable: "--sidebar-border",
      className: "bg-sidebar-border",
    },
    {
      name: "Sidebar Ring",
      variable: "--sidebar-ring",
      className: "bg-sidebar-ring",
    },
  ];

  // Simple color display box
  const ColorSwatch = ({
    className,
    name,
    cssVar = "",
  }: {
    className: string;
    name: string;
    cssVar?: string;
  }) => {
    return (
      <div className="flex flex-col">
        <div
          className={`h-12 w-full rounded-md border border-border ${className}`}
        />
        <div className="mt-1.5">
          <p className="text-xs font-medium leading-none">{name}</p>
          {cssVar && (
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              {cssVar}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <section>
        <div className="border-b pb-2 mb-6">
          <h2 className="text-2xl font-bold">Design System Colors</h2>
          <p className="text-muted-foreground">
            System-wide semantic color tokens
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Base Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Base UI Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              {cssVariables.slice(0, 9).map((color) => (
                <ColorSwatch
                  key={color.variable}
                  className={color.className}
                  name={color.name}
                  cssVar={color.className}
                />
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Semantic Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              {cssVariables.slice(9).map((color) => (
                <ColorSwatch
                  key={color.variable}
                  className={color.className}
                  name={color.name}
                  cssVar={color.className}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="border-b pb-2 mb-6">
          <h2 className="text-2xl font-bold">Status Colors</h2>
          <p className="text-muted-foreground">
            Application status and feedback colors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Status Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              {statusColors.map((color) => (
                <ColorSwatch
                  key={color.variable}
                  className={color.className}
                  name={color.name}
                  cssVar={color.className}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Chart Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              {chartColors.map((color) => (
                <ColorSwatch
                  key={color.variable}
                  className={color.className}
                  name={color.name}
                  cssVar={color.className}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
