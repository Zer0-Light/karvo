
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <h1 className="text-3xl font-bold text-primary">KARVO</h1>
      </div>

      <div className="w-full px-4 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 inline-block">
            Redefining Car Rental in the Middle East
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6">
            Rent Premium Cars from Local Owners
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Experience the future of car rental. Premium vehicles, seamless technology, and unmatched flexibility.
          </p>

          {/* Search Section */}
          <div className="bg-white rounded-full shadow-lg p-2 flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto">
            <div className="flex-1 min-w-[200px]">
              <Input 
                type="text" 
                placeholder="City, airport, address or hotel" 
                className="border-none focus-visible:ring-0 text-base"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <Input 
                type="text" 
                placeholder="From" 
                className="border-none focus-visible:ring-0 text-base"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <Input 
                type="text" 
                placeholder="Until" 
                className="border-none focus-visible:ring-0 text-base"
              />
            </div>
            <Button size="icon" className="bg-accent hover:bg-accent/90 rounded-full w-12 h-12">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 -mx-8 md:-mx-16 lg:-mx-32 xl:-mx-48"
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
