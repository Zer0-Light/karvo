import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// Middle Eastern airports data
const airports = [
  { code: "DXB", name: "Dubai International Airport", city: "Dubai, UAE" },
  { code: "AUH", name: "Abu Dhabi International Airport", city: "Abu Dhabi, UAE" },
  { code: "DOH", name: "Hamad International Airport", city: "Doha, Qatar" },
  { code: "MCT", name: "Muscat International Airport", city: "Muscat, Oman" },
  { code: "KWI", name: "Kuwait International Airport", city: "Kuwait City, Kuwait" },
  { code: "BAH", name: "Bahrain International Airport", city: "Manama, Bahrain" },
  { code: "RUH", name: "King Khalid International Airport", city: "Riyadh, Saudi Arabia" },
  { code: "JED", name: "King Abdulaziz International Airport", city: "Jeddah, Saudi Arabia" },
  { code: "CAI", name: "Cairo International Airport", city: "Cairo, Egypt" },
  { code: "AMM", name: "Queen Alia International Airport", city: "Amman, Jordan" },
];

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Logo and Become a Host */}
      <div className="absolute top-8 w-full px-4 md:px-8 flex justify-between items-center z-20">
        <h1 className="text-3xl font-bold text-primary">KARVO</h1>
        <Button 
          variant="outline" 
          className="bg-white hover:bg-accent/10 border-2 border-accent text-accent font-semibold rounded-full px-6"
          onClick={() => navigate("/become-host")}
        >
          Become a Host
        </Button>
      </div>

      <div className="w-full px-4 py-24 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 inline-block">
            Beta Release • Redefining Car Rental in the Middle East
          </span>
          <h1 className="text-4xl md:text-7xl font-bold text-primary mb-6">
            Car Rentals, Reimagined.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
            Rent the car you want, wherever you want
          </p>

          {/* Search Section */}
          <div className="bg-white rounded-2xl md:rounded-full shadow-lg p-4 md:p-2 flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full max-w-4xl mx-auto">
            {/* Location Autocomplete */}
            <div className="flex-1">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between border border-gray-200 hover:bg-transparent"
                  >
                    {location
                      ? airports.find((airport) => airport.code === location)?.name
                      : "Select airport..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] md:w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search airports..." />
                    <CommandEmpty>No airport found.</CommandEmpty>
                    <CommandGroup>
                      {airports.map((airport) => (
                        <CommandItem
                          key={airport.code}
                          value={airport.code}
                          onSelect={(currentValue) => {
                            setLocation(currentValue);
                            setOpen(false);
                          }}
                        >
                          <span>{airport.name}</span>
                          <span className="ml-2 text-sm text-muted-foreground">
                            ({airport.city})
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Start Date Calendar */}
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border border-gray-200 hover:bg-transparent",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    {startDate ? format(startDate, "PPP") : "From date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date Calendar */}
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border border-gray-200 hover:bg-transparent",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    {endDate ? format(endDate, "PPP") : "Until date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button size="icon" className="bg-accent hover:bg-accent/90 rounded-full w-full md:w-12 h-12">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 -mx-4 md:-mx-16 lg:-mx-32 xl:-mx-48"
          >
            <img
              src="/lovable-uploads/09957f3f-713e-4d24-9c6f-b3e8f135dc3e.png"
              alt="People enjoying a car ride"
              className="w-full object-cover shadow-xl"
            />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
    </section>
  );
};

export default Hero;
