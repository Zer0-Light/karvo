
import { Car } from "lucide-react";
import CarCard from "@/components/CarCard";

interface SearchResultsProps {
  cars: any[];
  isLoading: boolean;
  isAuthenticated: boolean;
}

const SearchResults = ({ cars, isLoading, isAuthenticated }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <div className="p-4 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <Car className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-semibold">No cars available</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} {...car} isAuthenticated={isAuthenticated} />
      ))}
    </div>
  );
};

export default SearchResults;

