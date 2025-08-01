interface Review {
  name: string;
  rating: number;
  quote: string;
}

interface ReviewsSummaryProps {
  reviews: Review[];
  averageRating?: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`text-xl ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <StarRating rating={review.rating} />
      <blockquote className="mt-4 text-gray-600 italic text-lg leading-relaxed">
        "{review.quote}"
      </blockquote>
      <cite className="mt-3 block text-sm text-gray-500 font-medium not-italic">
        — {review.name}
      </cite>
    </div>
  );
}

export default function ReviewsSummary({ reviews, averageRating = 4.9 }: ReviewsSummaryProps) {
  return (
    <div className="w-full py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Average Rating */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="text-3xl font-bold">{averageRating}</span>
            <StarRating rating={Math.floor(averageRating)} />
          </div>
          <p className="text-gray-600">Based on {reviews.length} reviews</p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}