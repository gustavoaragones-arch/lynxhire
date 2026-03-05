export default function DashboardLoading() {
  return (
    <div className="flex-1 p-6 space-y-4">
      <div className="h-8 bg-muted rounded-xl w-1/3 animate-pulse" />
      <div className="h-4 bg-muted rounded w-1/4 animate-pulse" />
      <div className="grid grid-cols-4 gap-4 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 bg-muted rounded-2xl animate-pulse"
          />
        ))}
      </div>
      <div className="h-64 bg-muted rounded-2xl animate-pulse mt-4" />
    </div>
  );
}
