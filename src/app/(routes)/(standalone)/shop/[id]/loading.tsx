// app/shop/[id]/loading.tsx

export default function Loading() {
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden animate-pulse">
      
      {/* ================================================================== */}
      {/* Layout for Smaller to Large Screens (< xl breakpoint)             */}
      {/* This block is visible on small screens and hidden on xl screens. */}
      {/* ================================================================== */}
      <div className="block xl:hidden max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-24">
        <div className="flex flex-col gap-8">
          
          {/* Image Placeholder */}
          <div className="relative aspect-square w-full bg-gray-800 rounded-2xl md:rounded-3xl"></div>

          {/* Color Selector Placeholders */}
          <div className="flex gap-3 justify-center">
            <div className="w-10 h-10 rounded-full bg-gray-800"></div>
            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
          </div>
          
          {/* Details Card Placeholder */}
          <div className="bg-[#1f1f1f] rounded-2xl md:rounded-3xl p-6 md:p-10 space-y-6">
            <div className="h-8 bg-gray-700 rounded w-3/4"></div> {/* Title */}
            <div className="flex gap-4">
              <div className="h-10 bg-gray-700 rounded w-28"></div> {/* Tonnage Selector */}
              <div className="h-10 bg-gray-700 rounded w-40"></div> {/* Star Selector */}
            </div>
            <div className="h-6 bg-gray-700 rounded w-1/2"></div> {/* Subtitle */}
            <div className="h-10 bg-gray-700 rounded w-1/3"></div> {/* Price */}

            {/* Quantity Selector Placeholder */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-700"></div>
              <div className="h-6 w-8 bg-gray-700 rounded"></div>
              <div className="h-10 w-10 rounded-full bg-gray-700"></div>
            </div>

            {/* Action Buttons Placeholders */}
            <div className="space-y-4 pt-4">
              <div className="h-12 bg-gray-700 rounded-full"></div>
              <div className="h-12 bg-gray-700 rounded-full"></div>
            </div>

            {/* Features Placeholder */}
            <div className="w-full h-px bg-gray-700 my-4"></div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
                <div className="h-4 w-20 bg-gray-700 rounded"></div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
                <div className="h-4 w-20 bg-gray-700 rounded"></div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
                <div className="h-4 w-20 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* Layout for Extra Large Screens (xl breakpoint and up)             */}
      {/* This block is hidden by default and only visible on xl screens. */}
      {/* ================================================================== */}
      <div className="h-full hidden xl:block w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-24">
        <div className="w-full h-full rounded-3xl flex" style={{
            backgroundImage: 'url(https://res.cloudinary.com/dqhk6dblu/image/upload/v1752040346/bgCard_uwhvcx.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          
          {/* Left-side Color Bar Placeholder */}
          <div className="w-[10%] min-h-[86vh] flex flex-col justify-center items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-white"></div>
            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
          </div>

          {/* Center Image Placeholder */}
          <div className="w-[45%] min-h-[86vh] flex justify-center items-center">
            <div className="w-full h-[500px] bg-gray-800/50 rounded-lg"></div>
          </div>
          
          {/* Right-side Details Card Placeholder */}
          <div className="w-[45%] min-h-[86vh] flex justify-center items-center">
            <div className="w-[80%] bg-[#1f1f1f]/60 rounded-3xl p-10 space-y-6">
              <div className="h-10 bg-gray-700 rounded w-3/4"></div> {/* Title */}
              <div className="flex gap-4">
                <div className="h-10 bg-gray-700 rounded w-28"></div> {/* Selector 1 */}
                <div className="h-10 bg-gray-700 rounded w-40"></div> {/* Selector 2 */}
              </div>
              <div className="h-8 bg-gray-700 rounded w-1/2"></div> {/* Subtitle */}
              <div className="h-12 bg-gray-700 rounded w-1/3"></div> {/* Price */}

              {/* Quantity Selector Placeholder */}
              <div className="flex items-center gap-3 pt-4">
                <div className="h-10 w-10 rounded-full bg-gray-700"></div>
                <div className="h-6 w-8 bg-gray-700 rounded"></div>
                <div className="h-10 w-10 rounded-full bg-gray-700"></div>
              </div>

              {/* Action Buttons Placeholders */}
              <div className="space-y-4 pt-4">
                <div className="h-12 bg-gray-700 rounded-full"></div>
                <div className="h-12 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

