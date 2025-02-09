
import { motion } from "framer-motion";
import { Search, Calendar, Key } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "Browse & Choose",
    description: "Find your perfect car from our curated selection of premium vehicles.",
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Book Instantly",
    description: "Select your dates and book immediately with our instant confirmation system.",
  },
  {
    icon: <Key className="w-8 h-8" />,
    title: "Unlock & Drive",
    description: "Use our app to unlock your car and start your journey.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">How Karvo Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Renting a car has never been easier. Three simple steps to get you on the road.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%_-_2rem)] w-16 border-t-2 border-dashed border-gray-300"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
