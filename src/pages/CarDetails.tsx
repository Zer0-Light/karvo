
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Car, MapPin } from "lucide-react";
import { format } from "date-fns";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select(`
          *,
          host:host_id(
            full_name,
            avatar_url,
            host_since,
            total_cars_listed
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Car not found</h1>
        <Button onClick={() => navigate("/search")}>Back to Search</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
              {car.photos && car.photos.length > 0 ? (
                <img
                  src={car.photos[0]}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <Car className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{`${car.year} ${car.make} ${car.model}`}</h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{car.location}</span>
              </div>
              {car.description && (
                <p className="text-muted-foreground">{car.description}</p>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">${car.price_per_day}/day</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Instant Book Available</p>
                    <p className="text-sm text-muted-foreground">
                      Book without waiting for host approval
                    </p>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Book Now
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">About the Host</h3>
              <div className="flex items-center gap-4">
                {car.host?.avatar_url ? (
                  <img
                    src={car.host.avatar_url}
                    alt={car.host.full_name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                    <Car className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <p className="font-semibold">{car.host?.full_name}</p>
                  {car.host?.host_since && (
                    <p className="text-sm text-muted-foreground">
                      Host since {format(new Date(car.host.host_since), 'MMMM yyyy')}
                    </p>
                  )}
                  {car.host?.total_cars_listed && (
                    <p className="text-sm text-muted-foreground">
                      {car.host.total_cars_listed} cars listed
                    </p>
                  )}
                </div>
              </div>
            </div>

            {car.features && car.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
