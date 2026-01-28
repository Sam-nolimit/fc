import FarmerDetailsContent from "./farmer-details-content";
import DashboardLayout from "@/app/components/dashboard/dashboard-layout";

interface PageProps {
  params: {
    id: string;
  };
}

export default function FarmerDetailsPage({ params }: PageProps) {
  // You can fetch farmer data based on params.id here
  
  return (
    <DashboardLayout
      user={{
        name: "Sharon",
        email: "sharon@example.com",
        role: "Admin",
      }}
    >
      <FarmerDetailsContent farmerId={params.id} />
    </DashboardLayout>
  );
}