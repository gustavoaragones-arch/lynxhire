export default function JobsLoading() {
  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="h-8 bg-muted rounded w-48 animate-pulse mb-2" />
        <div className="h-4 bg-muted rounded w-24 animate-pulse mb-8" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                  <div className="h-3 bg-muted rounded w-1/3 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
