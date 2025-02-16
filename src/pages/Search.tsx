
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";
import SearchForm from "@/components/search/SearchForm";
import SearchResults from "@/components/search/SearchResults";
import SearchFilters from "@/components/search/SearchFilters";
import { useEffect } from "react";
import { Database } from "@/integrations/supabase/types";
import { PostgrestError } from "@supabase/supabase-js";

type Car = Database['public']['Tables']['cars']['Row'];

type SearchFiltersType = {
  location: string;
  carType: string;
  pickupDate?: Date;
  returnDate?: Date;
};

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [filters, setFilters] = useState<SearchFiltersType>({
    location: searchParams.get('location') || "",
    carType: searchParams.get('type') || "all",
    pickupDate: searchParams.get('from') ? new Date(searchParams.get('from')!) : undefined,
    returnDate: searchParams.get('to') ? new Date(searchParams.get('to')!) : undefined,
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCars = async () => {
    try {
      let baseQuery = supabase.from('cars').select('*');

      if (filters.location) {
        const locationParts = filters.location.split(', ').map(part => part.toLowerCase());
        baseQuery = baseQuery.or(`city.ilike.%${locationParts[0]}%,location.ilike.%${locationParts[0]}%`);
      }

      if (filters.carType && filters.carType !== 'all') {
        baseQuery = baseQuery.eq('type', filters.carType);
      }

      const { data, error } = await baseQuery;

      if (error) throw error;
      return data as Car[];
    } catch (error) {
      console.error('Error fetching cars:', error);
      return [] as Car[];
    }
  };

  const { data: cars = [], isLoading } = useQuery({
    queryKey: [
      'available-cars',
      filters.location,
      filters.carType,
      filters.pickupDate?.toISOString(),
      filters.returnDate?.toISOString()
    ],
    queryFn: fetchCars,
    enabled: Boolean(filters.location && filters.pickupDate && filters.returnDate)
  });

  const handleSearch = (newFilters: SearchFiltersType) => {
    // Update URL parameters
    const params = new URLSearchParams();
    if (newFilters.location) params.set('location', newFilters.location);
    if (newFilters.pickupDate) params.set('from', newFilters.pickupDate.toISOString());
    if (newFilters.returnDate) params.set('to', newFilters.returnDate.toISOString());
    if (newFilters.carType && newFilters.carType !== 'all') params.set('type', newFilters.carType);
    setSearchParams(params);
    
    // Update filters state
    setFilters(newFilters);
  };

  const handleCarTypeChange = (carType: string) => {
    const newFilters = { ...filters, carType };
    handleSearch(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <div className="fixed top-8 left-8 z-50">
        <img 
          src="/lovable-uploads/db93a284-c1ab-484e-be12-8a5acbe8e74b.png" 
          alt="KARVO" 
          className="h-24 w-auto cursor-pointer"
          onClick={() => navigate("/")}
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
          <SearchForm onSearch={handleSearch} />
        </div>

        <div className="mb-6">
          <SearchFilters 
            carType={filters.carType}
            onCarTypeChange={handleCarTypeChange}
          />
        </div>

        <SearchResults cars={cars} isLoading={isLoading} isAuthenticated={!!user} />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Search;

