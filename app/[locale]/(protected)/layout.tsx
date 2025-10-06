import LayoutProvider from "@/providers/layout.provider";
import LayoutContentProvider from "@/providers/content.provider";
import DashBoardSidebar from "@/components/partials/sidebar";
import DashBoardFooter from "@/components/partials/footer";
import DashBoardHeader from "@/components/partials/header";
import { Toaster } from "@/components/ui/sonner";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutProvider>
      <DashBoardHeader />
      <DashBoardSidebar />
      <LayoutContentProvider>{children}</LayoutContentProvider>
      <DashBoardFooter />
      <Toaster />
    </LayoutProvider>
  );
};

export default layout;
