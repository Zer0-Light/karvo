
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search as SearchIcon, Calendar, MapPin } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  // Get today's date at midnight for consistent comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    // Read URL parameters and set form values
    const locationParam = searchParams.get('location');
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');

    // Find the matching city object based on the location parameter
    if (locationParam) {
      const matchingCity = GCC_CITIES.find(city => 
        city.value === locationParam.toLowerCase()
      );
      setLocation(matchingCity ? matchingCity.value : locationParam);
    }
    
    if (fromParam) setPickupDate(new Date(fromParam));
    if (toParam) setReturnDate(new Date(toParam));

    // If we have parameters, trigger search immediately
    if (locationParam || fromParam || toParam) {
      onSearch({
        location: locationParam || "",
        carType: "all",
        pickupDate: fromParam ? new Date(fromParam) : undefined,
        returnDate: toParam ? new Date(toParam) : undefined,
      });
    }
  }, [searchParams, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, carType: "all", pickupDate, returnDate });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
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

        <div className="space-y-2">
          <Label htmlFor="pickupDate">Pickup Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white",
                  !pickupDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {pickupDate ? format(pickupDate, "PPP") : "Select pickup date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <CalendarComponent
                mode="single"
                selected={pickupDate}
                onSelect={setPickupDate}
                disabled={(date) => date < today}
                initialFocus
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
                  "w-full justify-start text-left font-normal bg-white",
                  !returnDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {returnDate ? format(returnDate, "PPP") : "Select return date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <CalendarComponent
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                disabled={(date) => date < today || (pickupDate && date < pickupDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="w-[200px]">
          <SearchIcon className="mr-2 h-5 w-5" />
          Search Available Cars
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
