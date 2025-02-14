
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Car, MapPin, Calendar as CalendarIcon, CheckCircle } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select(`
          *,
          host:profiles!cars_host_id_fkey (
            full_name,
            avatar_url,
            host_since,
            total_cars_listed
          )
        `)
        .eq('id', id)
        .single();

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <Button onClick={() => navigate("/search")}>Back to Search</Button>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <img 
              src="/lovable-uploads/db93a284-c1ab-484e-be12-8a5acbe8e74b.png" 
              alt="KARVO" 
              className="h-16 w-auto cursor-pointer"
              onClick={() => navigate("/")}
            />
            <Button variant="ghost" onClick={() => navigate("/search")}>
              Back to Search
            </Button>
          </div>
        </nav>

        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Car Images */}
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={car.photos?.[0] || "/placeholder.svg"} 
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Car Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {car.year} {car.make} {car.model}
                </h1>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{car.location}</span>
                </div>
              </div>

              <div className="border-t border-b py-4">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {car.features?.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground">{car.description}</p>
              </div>

              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold">${car.price_per_day}</span>
                  <span className="text-muted-foreground">per day</span>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => setIsBookingOpen(true)}
                >
                  Book Now
                </Button>
              </div>

              {/* Host Information */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">About the Host</h2>
                <div className="flex items-center space-x-4">
                  <img
                    src={car.host?.avatar_url || "/placeholder.svg"}
                    alt={car.host?.full_name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{car.host?.full_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Host since {car.host?.host_since ? format(new Date(car.host.host_since), 'MMMM yyyy') : 'N/A'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {car.host?.total_cars_listed || 0} cars listed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Booking Dialog */}
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Select Rental Dates</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Calendar
                mode="range"
                selected={selectedDates}
                onSelect={(range) => setSelectedDates(range as Date[])}
                numberOfMonths={2}
                className="rounded-md border"
              />
            </div>
            <Button 
              className="w-full"
              disabled={selectedDates.length !== 2}
            >
              Continue Booking
            </Button>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </AuthGuard>
  );
};

export default CarDetails;
