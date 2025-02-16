
import { Star } from "lucide-react";

interface ReviewsProps {
  reviews: any[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="font-semibold mb-4">RATINGS & REVIEWS</h2>
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-muted-foreground">
          ({reviews.length} reviews)
        </span>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-t pt-4">
            <div className="flex items-start space-x-4">
              <img
                src={review.host.avatar_url || "/placeholder.svg"}
                alt={review.host.full_name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{review.host.full_name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
                <p className="mt-2">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
