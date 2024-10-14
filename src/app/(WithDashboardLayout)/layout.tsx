import DashboardLayout from "@/src/components/modules/dashboard/DashboardLayout";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
};

export default layout;
