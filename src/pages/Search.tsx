import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CarCard from "@/components/CarCard";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cars, setCars] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('cars')
          .select('*')
          .eq('status', 'available');

        if (searchQuery) {
          query = query.or(`make.ilike.%${searchQuery}%,model.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
        }

        const { data, error } = await query;

        if (error) throw error;
        setCars(data || []);
      } catch (error) {
        console.error('Error fetching cars:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load cars. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [searchQuery, toast]);

  const handleListNewCar = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You must be logged in to list a car",
        });
        navigate("/login");
        return;
      }

      // Create a new car entry with Mariam's Audi A7
      const { data: carData, error } = await supabase
        .from('cars')
        .insert({
          host_id: session.user.id,
          make: 'Audi',
          model: 'A7',
          year: 2021,
          price_per_day: 199,
          status: 'unlisted',
          type: 'sedan',
          features: [
            'Premium Sound System',
            'Leather Seats',
            'Navigation System',
            'Bluetooth',
            'Backup Camera',
            'Parking Sensors',
            'Keyless Entry',
            'Heated Seats'
          ],
          description: 'Experience luxury and performance with this stunning 2021 Audi A7 Prestige. Features premium amenities and advanced technology for a comfortable and sophisticated driving experience.',
          location: 'Dubai, UAE',
          city: 'Dubai',
          state: 'Dubai',
          country: 'UAE',
          vehicle_value: 65000
        })
        .select('id')
        .single();

      if (error) throw error;

      // Navigate to the VIN entry page
      navigate(`/list-your-car/vin/${carData.id}`);
    } catch (error) {
      console.error('Error creating car:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create car listing. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={handleListNewCar}
          className="mb-6"
        >
          List New Audi A7
        </Button>

        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by make, model, or location..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                {...car}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No cars found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
