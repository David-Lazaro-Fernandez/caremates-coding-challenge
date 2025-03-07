import { Card } from "@/src/components/ui/card";

interface MetricCardProps {
  title: string;
  value: number;
  description: string;
}

export function MetricCard({ title, value, description }: MetricCardProps) {
  return (
    <Card className="p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-semibold mt-2">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </Card>
  );
}
