export default function BrowseLoading() {
  return (
    <div className="flex-1 p-6 space-y-4">
      <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
        <div className="h-10 bg-muted rounded-lg animate-pulse" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-8 w-20 bg-muted rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-muted rounded-xl animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                <div className="h-3 bg-muted rounded w-1/3 animate-pulse" />
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="h-6 w-16 bg-muted rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
