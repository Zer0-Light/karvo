
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Car, DollarSign, MapPin } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";

const CarHistory = () => {
  const { carId } = useParams();
  const navigate = useNavigate();

  const { data: car, isLoading: isLoadingCar } = useQuery({
    queryKey: ['car', carId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ['car-bookings', carId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles:renter_id (
            full_name,
            avatar_url
          )
        `)
        .eq('car_id', carId)
        .order('start_date', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoadingCar || isLoadingBookings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50/50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  className="mr-4"
                >
                  ← Back
                </Button>
                <h1 className="text-xl font-semibold">Car History</h1>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {car && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-40 h-40 rounded-lg overflow-hidden">
                      <img
                        src={car.photos?.[0] || "/placeholder.svg"}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold mb-4">
                      {car.year} {car.make} {car.model}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span>{car.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-gray-400" />
                        <span>{car.odometer_reading?.toLocaleString()} miles</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                        <span>${car.price_per_day}/day</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Booking History</h3>
              <div className="space-y-4">
                {bookings?.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <Car className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-500">No booking history available</p>
                  </div>
                ) : (
                  bookings?.map((booking) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg shadow-sm p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                            <img
                              src={booking.profiles?.avatar_url || "/placeholder.svg"}
                              alt={booking.profiles?.full_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              {booking.profiles?.full_name}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {format(new Date(booking.start_date), "MMM d, yyyy")} - {format(new Date(booking.end_date), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${booking.total_price}</div>
                          <div className="text-sm text-gray-500">
                            Status: <span className="capitalize">{booking.status}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default CarHistory;
