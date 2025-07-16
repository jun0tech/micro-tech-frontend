"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  message?: string;
}

export default function ErrorPage({
  error,
  resetError,
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again or contact support if the problem persists.",
}: ErrorPageProps) {
  const handleReload = () => {
    window.location.reload();
  };

  const handleRetry = () => {
    if (resetError) {
      resetError();
    } else {
      handleReload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 p-4">
      {/* Background decoration elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-red-400 rounded-full opacity-10 blur-3xl mix-blend-multiply"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-red-600 rounded-full opacity-10 blur-3xl mix-blend-multiply"></div>

      <Card className="w-full max-w-md z-10 text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600">{message}</p>

            {error && process.env.NODE_ENV === "development" && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Error Details (Development)
                </summary>
                <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono text-gray-700 overflow-auto max-h-32">
                  <p>
                    <strong>Message:</strong> {error.message}
                  </p>
                  {error.stack && (
                    <p className="mt-2">
                      <strong>Stack:</strong>
                    </p>
                  )}
                  {error.stack && (
                    <pre className="whitespace-pre-wrap">{error.stack}</pre>
                  )}
                </div>
              </details>
            )}
          </div>

          <div className="space-y-3">
            <Button className="w-full" onClick={handleRetry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            {/* <Link to={ROUTES.APP.DASHBOARD} className="block">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link> */}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If this problem continues, please contact our support team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
