import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 pb-8">
          <div className="flex mb-4 gap-3 items-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">404 — Page not found</h1>
              <p className="text-sm text-slate-500">The page you are looking for doesn't exist or has been moved.</p>
            </div>
          </div>

          <div className="mt-6 text-sm text-slate-600 space-y-4">
            <p>Try returning to the dashboard or checking the URL.</p>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Go to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
