
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CarShowcase from "../components/CarShowcase";
import HowItWorks from "../components/HowItWorks";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <CarShowcase />
      <Features />
      <HowItWorks />
      
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied users who have already discovered the future of car rental.
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105">
            Download Karvo App
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default Index;
