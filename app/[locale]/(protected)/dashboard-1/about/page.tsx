import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/navigation";

const AboutPage = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Back Button */}
      <div>
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* About Content */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-4">About Total EER Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Enterprise Energy Resource management system for Total Energies Nigeria filling stations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Next.js 14 with App Router</CardTitle>
              <CardDescription>
                The latest routing system for modern React applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                This project uses the new App Router introduced in Next.js 13, which provides:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Server Components by default</li>
                <li>Improved performance and SEO</li>
                <li>Built-in loading and error states</li>
                <li>Streaming and React Suspense</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>💅 Design System</CardTitle>
              <CardDescription>
                Modern, accessible UI components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Built with industry-standard design tools:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>shadcn/ui component library</li>
                <li>Radix UI primitives</li>
                <li>Tailwind CSS for styling</li>
                <li>Lucide React icons</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔧 Developer Experience</CardTitle>
              <CardDescription>
                Tools for productive development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Enhanced with developer-friendly tools:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>TypeScript for type safety</li>
                <li>ESLint for code quality</li>
                <li>Hot reload for fast development</li>
                <li>File-based routing</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⛽ Total EER Features</CardTitle>
              <CardDescription>
                Energy management for Nigerian filling stations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Specialized features for Total Energies Nigeria:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Real-time fuel inventory tracking</li>
                <li>Energy consumption analytics</li>
                <li>Multi-branch performance monitoring</li>
                <li>Nigerian regulatory compliance</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-900 dark:text-red-100">
              � About Total Energies Nigeria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-800 dark:text-red-200 mb-4">
              Total Energies is a major French multinational energy company operating in Nigeria since 1956, 
              providing fuel retail services across the country with a focus on sustainable energy solutions.
            </p>
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
              <p className="text-xs font-mono text-red-900 dark:text-red-100">
                🏪 Operating in Lagos, Abuja, Port Harcourt, and other major cities
              </p>
              <p className="text-xs text-red-700 dark:text-red-300 mt-2">
                Committed to energy transition and environmental sustainability in Nigeria
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;