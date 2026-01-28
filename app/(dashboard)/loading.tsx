export default function DashboardLayoutLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Skeleton */}
      <div className="fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        
        {/* User Profile Skeleton */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        
        {/* Navigation Skeleton */}
        <div className="p-4 space-y-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
        
        {/* Logout Button Skeleton */}
        <div className="p-4 border-t border-gray-200">
          <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>
      
      {/* Main Content Area Skeleton */}
      <div className="lg:pl-64">
        {/* Header Skeleton */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="lg:hidden h-6 w-6 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Loading */}
        <div className="p-6">
          <DashboardLoading />
        </div>
      </div>
    </div>
  );
}