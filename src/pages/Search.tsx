
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search as SearchIcon, Calendar, Car, MapPin } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import CarCard from "@/components/CarCard";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const GCC_CITIES = [
  // Saudi Arabia
  { value: "riyadh", label: "Riyadh, Saudi Arabia" },
  { value: "jeddah", label: "Jeddah, Saudi Arabia" },
  { value: "dammam", label: "Dammam, Saudi Arabia" },
  // UAE
  { value: "dubai", label: "Dubai, UAE" },
  { value: "abu-dhabi", label: "Abu Dhabi, UAE" },
  { value: "sharjah", label: "Sharjah, UAE" },
  // Qatar
  { value: "doha", label: "Doha, Qatar" },
  // Kuwait
  { value: "kuwait-city", label: "Kuwait City, Kuwait" },
  // Bahrain
  { value: "manama", label: "Manama, Bahrain" },
  // Oman
  { value: "muscat", label: "Muscat, Oman" },
];

const Search = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ['available-cars', location, carType, pickupDate, returnDate],
    enabled: !!(location && pickupDate && returnDate),
    queryFn: async () => {
      let query = supabase
        .from('cars')
        .select('*')
        .eq('status', 'available');

      if (location) {
        query = query.ilike('location', `%${location}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search will be triggered automatically by the useQuery hook
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50/50 flex flex-col">
        <div className="fixed top-8 left-8 z-50">
          <img 
            src="/lovable-uploads/db93a284-c1ab-484e-be12-8a5acbe8e74b.png" 
            alt="KARVO" 
            className="h-24 w-auto cursor-pointer"
            onClick={() => navigate("/")}
            style={{ position: 'fixed' }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 max-w-6xl mx-auto px-6 pt-24 pb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-8">Find Your Perfect Rental</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger id="location" className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {GCC_CITIES.map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carType">Vehicle Type</Label>
                  <Select value={carType} onValueChange={setCarType}>
                    <SelectTrigger id="carType" className="w-full">
                      <Car className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="economy">Economy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !pickupDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {pickupDate ? format(pickupDate, "PPP") : "Select pickup date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="returnDate">Return Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !returnDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {returnDate ? format(returnDate, "PPP") : "Select return date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                        disabled={(date) => pickupDate ? date <= pickupDate : date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button type="submit" className="w-full md:w-auto">
                <SearchIcon className="mr-2 h-5 w-5" />
                Search Available Cars
              </Button>
            </form>
          </div>

          {/* Results section */}
          {isLoading ? (
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
          ) : cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car.id} {...car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Car className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold">No cars available</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </motion.div>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Search;
