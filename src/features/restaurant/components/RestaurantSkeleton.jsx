import { Skeleton } from "../../../components/ui/Skeleton";

const RestaurantSkeleton = () => {
  return (
    <div className="max-w-4xl px-md-0 px-10 mx-auto my-20 flex flex-col gap-6">
      {/* Restaurant Header Skeleton */}
      <div>
        <Skeleton className="h-9 w-64 md:w-80 bg-gray-200 rounded-lg mb-4" />
        <div className="border-2 border-[#E6E6ED] bg-gradient-to-b from-white via-[#ebebf2] to-[#dfdfe7] rounded-2xl p-5 rounded-b-[36px]">
          <div className="bg-white p-5 rounded-b-[36px] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-14 bg-gray-200 rounded" />
              <Skeleton className="h-5 w-24 bg-gray-200 rounded" />
              <Skeleton className="h-5 w-28 bg-gray-200 rounded" />
            </div>
            <Skeleton className="h-4 w-48 bg-gray-200 rounded" />
            <div className="border-t border-dashed border-gray-200 pt-3 flex flex-col gap-2">
              <Skeleton className="h-4 w-56 bg-gray-200 rounded" />
              <Skeleton className="h-4 w-40 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Offers Slider Skeleton */}
      <div className="flex gap-4 overflow-hidden py-2">
        <Skeleton className="h-20 w-72 shrink-0 bg-gray-200 rounded-2xl" />
        <Skeleton className="h-20 w-72 shrink-0 bg-gray-200 rounded-2xl" />
        <Skeleton className="h-20 w-72 shrink-0 bg-gray-200 rounded-2xl" />
      </div>

      {/* Categories & Food Items Skeleton */}
      <div className="flex flex-col gap-6 mt-4">
        {[1, 2, 3].map((catIndex) => (
          <div key={catIndex} className="border-b-8 border-gray-100 pb-6">
            <div className="flex justify-between items-center py-3 mb-4">
              <Skeleton className="h-7 w-48 bg-gray-200 rounded" />
              <Skeleton className="h-6 w-6 bg-gray-200 rounded-full" />
            </div>
            {[1, 2].map((itemIndex) => (
              <div
                key={itemIndex}
                className="py-5 flex justify-between items-start border-b border-gray-200 gap-4"
              >
                <div className="w-8/12 flex flex-col gap-2">
                  <Skeleton className="h-4 w-4 bg-gray-200 rounded-sm" />
                  <Skeleton className="h-5 w-44 md:w-56 bg-gray-200 rounded" />
                  <Skeleton className="h-4 w-20 bg-gray-200 rounded" />
                  <Skeleton className="h-3 w-full bg-gray-200 rounded mt-2" />
                  <Skeleton className="h-3 w-4/5 bg-gray-200 rounded" />
                </div>
                <div className="relative shrink-0 w-36 md:w-40 flex flex-col items-center">
                  <Skeleton className="w-36 h-28 md:w-40 md:h-32 bg-gray-200 rounded-2xl" />
                  <Skeleton className="w-24 h-9 bg-gray-200 rounded-xl mt-[-16px]" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantSkeleton;
