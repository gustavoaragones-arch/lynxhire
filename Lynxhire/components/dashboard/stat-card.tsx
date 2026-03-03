interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: string;
  accent?: boolean;
}

export function StatCard({
  label,
  value,
  change,
  icon,
  accent,
}: StatCardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-5 ${accent ? "border-primary/30" : ""}`}
    >
      <div className="mb-3 flex items-start justify-between">
        <span className="text-2xl">{icon}</span>
        {change && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              change.startsWith("+")
                ? "bg-green-100 text-green-700"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <p className="font-heading text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
