import { Link } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserX } from "lucide-react";

export default function StaffNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[600px] p-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <UserX className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Staff Member Not Found</CardTitle>
          <CardDescription>
            The staff member you're looking for doesn't exist or may have been removed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please check the staff ID and try again, or return to the staff management page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link href="/staff">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Staff
              </Link>
            </Button>
            <Button asChild>
              <Link href="/staff/add">
                Add New Staff Member
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}