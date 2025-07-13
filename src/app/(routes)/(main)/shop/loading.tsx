// app/shop/loading.tsx

// This is a skeleton component for a single product card.
// It's kept inside the loading file because it's only used here.
const GhostProductCard = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {/* Image Placeholder */}
      <div className="bg-gray-800 rounded-lg w-full aspect-square"></div>
      
      {/* Text Placeholders */}
      <div className="space-y-3">
        <div className="h-5 bg-gray-800 rounded w-3/4"></div>
        <div className="h-5 bg-gray-800 rounded w-1/2"></div>
      </div>
    </div>
  );
};

// This is the main loading component that Next.js will use.
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#101010] text-white pt-20 pb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12">
        {/* Ghost Header */}
        <div className="text-center mb-8 md:mb-16 animate-pulse">
          <div className="h-10 md:h-16 bg-gray-800 rounded-lg w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-800 rounded-lg w-full max-w-2xl mx-auto"></div>
        </div>

        {/* Ghost Filter Bar */}
        <div className="w-full flex flex-wrap justify-start lg:justify-end gap-3 mb-3 md:mb-8 items-center px-2 md:px-5 xl:px-8 animate-pulse">
          <div className="h-10 w-36 bg-gray-800 rounded-lg"></div>
          <div className="h-10 w-48 bg-gray-800 rounded-lg"></div>
        </div>

        {/* Ghost Product Grid */}
        <div className="w-full !px-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Render 6 ghost cards to simulate the initial loading state */}
          {[...Array(6)].map((_, i) => (
            <GhostProductCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
