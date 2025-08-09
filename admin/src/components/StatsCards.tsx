import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RegistrantStats } from "@/types/form-entries";

interface StatsCardsProps {
  stats: RegistrantStats;
  isLoading: boolean;
}

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  colorClass: string;
}

function StatCard({ title, value, description, colorClass }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function LoadingStatCard() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </CardHeader>
      <CardContent>
        <div className="h-8 bg-gray-200 rounded w-12 mb-2"></div>
      </CardContent>
    </Card>
  );
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <LoadingStatCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard
        title="Total Registrations"
        value={stats.total}
        description="All registrants"
        colorClass="text-primary"
      />
      <StatCard
        title="Accepted"
        value={stats.accepted}
        description="Approved attendees"
        colorClass="text-green-600"
      />
      <StatCard
        title="Pending"
        value={stats.pending}
        description="Awaiting review"
        colorClass="text-yellow-600"
      />
      <StatCard
        title="Rejected"
        value={stats.rejected}
        description="Declined applications"
        colorClass="text-red-600"
      />
      <StatCard
        title="Checked In"
        value={stats.checkedIn}
        description="Present at event"
        colorClass="text-blue-600"
      />
    </div>
  );
}

// Compact version for manage page
export function CompactStatsCards({ stats }: { stats: RegistrantStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <StatCard
        title="Total"
        value={stats.total}
        description=""
        colorClass="text-primary"
      />
      <StatCard
        title="Accepted"
        value={stats.accepted}
        description=""
        colorClass="text-green-600"
      />
      <StatCard
        title="Pending"
        value={stats.pending}
        description=""
        colorClass="text-yellow-600"
      />
      <StatCard
        title="Rejected"
        value={stats.rejected}
        description=""
        colorClass="text-red-600"
      />
      <StatCard
        title="Checked In"
        value={stats.checkedIn}
        description=""
        colorClass="text-blue-600"
      />
    </div>
  );
}
