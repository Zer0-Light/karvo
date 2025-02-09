
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/lovable-uploads/f346075b-9820-4e93-9eac-9446f8fa81af.png')",
          filter: "brightness(0.8)",
        }}
      />
      
      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <h1 className="text-3xl font-bold text-white">Karvo</h1>
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="px-4 py-2 rounded-full bg-accent/10 text-white text-sm font-medium mb-6 inline-block backdrop-blur-sm">
            Redefining Car Rental in the Middle East
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Rent Premium Cars from Local Owners
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the future of car rental. Premium vehicles, seamless technology, and unmatched flexibility.
          </p>
          <button className="bg-accent text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-accent/90 transition-all transform hover:scale-105">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
