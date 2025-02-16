
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search as SearchIcon, MapPin } from "lucide-react";

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

interface SearchFormProps {
  onSearch: (formData: {
    location: string;
    carType: string;
    pickupDate?: Date;
    returnDate?: Date;
  }) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    const locationParam = searchParams.get('location');

    if (locationParam) {
      const matchingCity = GCC_CITIES.find(city => 
        city.value === locationParam.toLowerCase()
      );
      setLocation(matchingCity ? matchingCity.value : locationParam);
    }
    
    if (locationParam) {
      onSearch({
        location: locationParam,
        carType: "all"
      });
    }
  }, [searchParams, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, carType: "all" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-4 items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location" className="w-full bg-white">
              <MapPin className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select a city">
                {location && GCC_CITIES.find(city => city.value === location)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="z-50 bg-white border shadow-md">
              {GCC_CITIES.map((city) => (
                <SelectItem 
                  key={city.value} 
                  value={city.value}
                  className="hover:bg-accent focus:bg-accent"
                >
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit">
          <SearchIcon className="mr-2 h-5 w-5" />
          Search Available Cars
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
