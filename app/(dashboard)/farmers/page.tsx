// import FarmersPage from "./farmers-content";
import DashboardLayout from "@/app/components/dashboard/dashboard-layout";
import FarmersPage from "./content";

export default function Farmers() {
  return (
    <DashboardLayout
      user={{
        name: "Sharon",
        email: "sharon@example.com",
        role: "Admin",
      }}
    >
      <FarmersPage />
    </DashboardLayout>
  );
}