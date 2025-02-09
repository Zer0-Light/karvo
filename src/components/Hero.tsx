
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-32 relative z-10">
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
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the future of car rental. Premium vehicles, seamless technology, and unmatched flexibility.
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-all transform hover:scale-105">
            Start Your Journey
          </button>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
    </section>
  );
};

export default Hero;
