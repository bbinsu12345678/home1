export default function Loading() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header skeleton */}
            <div className="h-16 bg-gray-100 animate-pulse" />

            {/* Hero skeleton */}
            <div className="bg-black p-8">
                <div className="max-w-3xl mx-auto aspect-[860/1100] bg-gray-800 rounded-[2rem] animate-pulse" />
            </div>

            {/* Content skeletons */}
            <div className="max-w-2xl mx-auto px-4 py-16 space-y-4">
                <div className="h-8 bg-gray-200 rounded-lg w-1/3 mx-auto animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-2/3 mx-auto animate-pulse" />
                <div className="grid grid-cols-2 gap-4 mt-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
}
