
import { Car } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  carType: string;
  onCarTypeChange: (value: string) => void;
}

const SearchFilters = ({ carType, onCarTypeChange }: SearchFiltersProps) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="w-64">
        <Select value={carType} onValueChange={onCarTypeChange}>
          <SelectTrigger className="w-full bg-white">
            <Car className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by vehicle type" />
          </SelectTrigger>
          <SelectContent className="z-50 bg-white border shadow-md">
            <SelectItem value="" className="hover:bg-accent focus:bg-accent">
              All Types
            </SelectItem>
            <SelectItem value="luxury" className="hover:bg-accent focus:bg-accent">
              Luxury
            </SelectItem>
            <SelectItem value="suv" className="hover:bg-accent focus:bg-accent">
              SUV
            </SelectItem>
            <SelectItem value="sports" className="hover:bg-accent focus:bg-accent">
              Sports
            </SelectItem>
            <SelectItem value="economy" className="hover:bg-accent focus:bg-accent">
              Economy
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilters;
