"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      {/* Background decoration elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full opacity-10 blur-3xl mix-blend-multiply"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-600 rounded-full opacity-10 blur-3xl mix-blend-multiply"></div>

      <Card className="w-full max-w-md z-10 text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-6xl font-bold text-blue-600">404</p>
            <p className="text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="space-y-3">
            {/* <Link to={ROUTES.APP.DASHBOARD} className="block">
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link> */}

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Contact support or visit our help center.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
