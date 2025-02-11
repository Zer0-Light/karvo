
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Car, Calendar, MapPin } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Trip = {
  id: string;
  vehicle_type: string;
  pickup_location: string;
  pickup_date: string;
  return_date: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
};

const Trips = () => {
  const [statusFilter, setStatusFilter] = useState<Trip['status'] | 'all'>('all');

  const { data: trips, isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('pickup_date', { ascending: false });

      if (error) throw error;
      return data as Trip[];
    },
  });

  const filteredTrips = trips?.filter(trip => 
    statusFilter === 'all' ? true : trip.status === statusFilter
  );

  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-600';
      case 'ongoing':
        return 'text-green-600';
      case 'completed':
        return 'text-gray-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50/50 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-primary">My Trips</h1>
            <div className="w-48">
              <Label htmlFor="statusFilter">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={(value: Trip['status'] | 'all') => setStatusFilter(value)}>
                <SelectTrigger id="statusFilter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trips</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="h-32 bg-gray-200" />
                  <CardContent className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredTrips?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <Card key={trip.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        {trip.vehicle_type}
                      </CardTitle>
                      <span className={`font-medium capitalize ${getStatusColor(trip.status)}`}>
                        {trip.status}
                      </span>
                    </div>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4" />
                      {trip.pickup_location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          Pickup: {format(new Date(trip.pickup_date), "PPP")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          Return: {format(new Date(trip.return_date), "PPP")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-8">
              <CardHeader>
                <div className="mx-auto w-48 h-48 mb-4">
                  <img 
                    src="/lovable-uploads/817a1468-13e5-4f50-8aec-8af223f60317.png"
                    alt="No trips found"
                    className="w-full h-full object-contain opacity-50"
                  />
                </div>
                <CardTitle className="text-2xl">No trips found</CardTitle>
                <CardDescription>
                  {statusFilter === 'all' 
                    ? "You haven't made any trips yet."
                    : `You don't have any ${statusFilter} trips.`}
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </motion.div>
      </div>
    </AuthGuard>
  );
};

export default Trips;
