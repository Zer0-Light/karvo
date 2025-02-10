
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CarShowcase from "../components/CarShowcase";
import HowItWorks from "../components/HowItWorks";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-16" // Add padding top to account for fixed navigation
    >
      <Navigation />
      <Hero />
      
      {/* Drive Terms Section */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-primary leading-tight"
              >
                Ditch the rental counter—drive on your terms.
              </motion.h2>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-lg text-gray-600 mb-8">
                  Choose from a wide range of cars, wherever you need them.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                      <div className="h-2 w-2 rounded-full bg-accent"></div>
                    </div>
                    <span className="text-gray-600">
                      Convenient airport pickups in the UAE, Oman, Qatar, Kuwait
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                      <div className="h-2 w-2 rounded-full bg-accent"></div>
                    </div>
                    <span className="text-gray-600">
                      Skip the lines—book, find, and unlock your car with the app
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                      <div className="h-2 w-2 rounded-full bg-accent"></div>
                    </div>
                    <span className="text-gray-600">
                      24/7 support for a hassle-free experience
                    </span>
                  </li>
                </ul>
                
                <p className="text-xl font-semibold text-primary mt-8">
                  Your ride, your way.
                </p>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:w-1/2"
            >
              <img
                src="/lovable-uploads/3ae54749-b797-49c4-9011-645aac2c7885.png"
                alt="World map illustration showing global car rental locations"
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
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
