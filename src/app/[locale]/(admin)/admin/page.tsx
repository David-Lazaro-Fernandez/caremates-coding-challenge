"use client";

import { Card } from "@/src/components/ui/card";
import { MetricCard } from "@/src/components/admin/MetricCard";
import { LineChart } from "@/src/components/admin/LineChart";
import { ApplicationsTable } from "@/src/components/admin/ApplicationsTable";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  applicantService,
  type Application,
} from "@/src/services/application-service";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    completedApplications: 0,
  });
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      const applications = await applicantService.getAllApplications();
      if (applications) {
        setApplications(applications);
        setMetrics({
          totalApplications: applications.length,
          pendingApplications: applications.filter((app) => !app.finished_at)
            .length,
          completedApplications: applications.filter((app) => app.finished_at)
            .length,
        });
      }
    };
    fetchData()
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Applications"
          value={metrics.totalApplications}
          description="All time applications"
        />
        <MetricCard
          title="Pending Applications"
          value={metrics.pendingApplications}
          description="Requires attention"
        />
        <MetricCard
          title="Completed Applications"
          value={metrics.completedApplications}
          description="Successfully processed"
        />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
        <div className="overflow-x-auto">
          <ApplicationsTable applications={applications} />
        </div>
      </Card>
    </div>
  );
}
