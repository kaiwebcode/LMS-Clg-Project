import { adminGetEnrollmentStats } from "@/app/data/admin/admin-get-enrollment-stats";
import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";

export default async function AnalyticsPage() {

    const enrollmentData = await adminGetEnrollmentStats();

    return (
        <div className="w-full">

              <ChartAreaInteractive data={enrollmentData} />
        </div>
    );
}