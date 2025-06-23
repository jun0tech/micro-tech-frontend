export function TailwindTest() {
  // Array of shade values for the color swatches
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Tailwind CSS Color Test</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Primary Colors</h3>
          <div className="flex flex-wrap gap-2">
            {shades.map((shade) => (
              <div
                key={`primary-${shade}`}
                className={`w-24 h-24 bg-primary-${shade} rounded flex items-center justify-center ${
                  shade >= 500 ? "text-white" : ""
                } text-sm`}
              >
                {shade}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Success Colors</h3>
          <div className="flex flex-wrap gap-2">
            {shades.map((shade) => (
              <div
                key={`success-${shade}`}
                className={`w-24 h-24 bg-success-${shade} rounded flex items-center justify-center ${
                  shade >= 500 ? "text-white" : ""
                } text-sm`}
              >
                {shade}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Warning Colors</h3>
          <div className="flex flex-wrap gap-2">
            {shades.map((shade) => (
              <div
                key={`warning-${shade}`}
                className={`w-24 h-24 bg-warning-${shade} rounded flex items-center justify-center ${
                  shade >= 500 ? "text-white" : ""
                } text-sm`}
              >
                {shade}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Danger Colors</h3>
          <div className="flex flex-wrap gap-2">
            {shades.map((shade) => (
              <div
                key={`danger-${shade}`}
                className={`w-24 h-24 bg-danger-${shade} rounded flex items-center justify-center ${
                  shade >= 500 ? "text-white" : ""
                } text-sm`}
              >
                {shade}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">CSS Variables</h3>
          <div className="flex flex-wrap gap-2">
            <div className="w-24 h-24 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm">
              primary
            </div>
            <div className="w-24 h-24 bg-secondary rounded flex items-center justify-center text-secondary-foreground text-sm">
              secondary
            </div>
            <div className="w-24 h-24 bg-accent rounded flex items-center justify-center text-accent-foreground text-sm">
              accent
            </div>
            <div className="w-24 h-24 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
              muted
            </div>
            <div className="w-24 h-24 bg-destructive rounded flex items-center justify-center text-destructive-foreground text-sm">
              destructive
            </div>
            <div className="w-24 h-24 bg-success rounded flex items-center justify-center text-success-foreground text-sm">
              success
            </div>
            <div className="w-24 h-24 bg-warning rounded flex items-center justify-center text-warning-foreground text-sm">
              warning
            </div>
            <div className="w-24 h-24 bg-danger rounded flex items-center justify-center text-danger-foreground text-sm">
              danger
            </div>
            <div className="w-24 h-24 bg-info rounded flex items-center justify-center text-info-foreground text-sm">
              info
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
