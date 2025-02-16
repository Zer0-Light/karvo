
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";
import SearchForm from "@/components/search/SearchForm";
import SearchResults from "@/components/search/SearchResults";
import SearchFilters from "@/components/search/SearchFilters";
import { Database } from "@/integrations/supabase/types";

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

  const fetchCars = useCallback(async () => {
    if (!filters.location) return [];

    try {
      const baseQuery = supabase.from('cars').select('*');
      const locationPart = filters.location.split(', ')[0].toLowerCase();
      
      let query = baseQuery.or(`city.ilike.%${locationPart}%,location.ilike.%${locationPart}%`);


      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching cars:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in fetchCars:', error);
      return [];
    }
  }, [filters.location, filters.carType]);

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

  const handleSearch = useCallback((newFilters: SearchFiltersType) => {
    const params = new URLSearchParams();
    if (newFilters.location) params.set('location', newFilters.location);
    if (newFilters.pickupDate) params.set('from', newFilters.pickupDate.toISOString());
    if (newFilters.returnDate) params.set('to', newFilters.returnDate.toISOString());
    if (newFilters.carType && newFilters.carType !== 'all') params.set('type', newFilters.carType);
    
    // Update URL without causing a reload
    setSearchParams(params, { replace: true });
    setFilters(newFilters);
  }, [setSearchParams]);

  const handleCarTypeChange = useCallback((carType: string) => {
    const newFilters = { ...filters, carType };
    handleSearch(newFilters);
  }, [filters, handleSearch]);

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <div className="fixed top-8 left-8 z-[9999]">
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
