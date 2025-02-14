
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import AuthGuard from "@/components/AuthGuard";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import SearchForm from "@/components/search/SearchForm";
import SearchResults from "@/components/search/SearchResults";

interface SearchFilters {
  location: string;
  carType: string;
  pickupDate?: Date;
  returnDate?: Date;
}

const Search = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    carType: "",
  });

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ['available-cars', filters.location, filters.carType, filters.pickupDate, filters.returnDate],
    enabled: !!(filters.location && filters.pickupDate && filters.returnDate),
    queryFn: async () => {
      let query = supabase
        .from('cars')
        .select('*')
        .eq('status', 'available');

      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
  });

  return (
    <AuthGuard>
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
            <SearchForm onSearch={setFilters} />
          </div>

          <SearchResults cars={cars} isLoading={isLoading} />
        </motion.div>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Search;
