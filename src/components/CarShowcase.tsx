
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const cars = [
  {
    name: "BMW 7 Series",
    image: "/images/bmw.jpg",
    price: "299",
    type: "Luxury Sedan",
  },
  {
    name: "Tesla Model S",
    image: "/images/tesla.jpg",
    price: "249",
    type: "Electric Luxury",
  },
  {
    name: "Mercedes-Benz S-Class",
    image: "/images/mercedes.jpg",
    price: "329",
    type: "Premium Luxury",
  },
];

const CarShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCar = () => {
    setCurrentIndex((prev) => (prev + 1) % cars.length);
  };

  const prevCar = () => {
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Featured Vehicles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our selection of premium vehicles available for rent
          </p>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="relative aspect-video">
              <motion.img
                key={currentIndex}
                src={cars[currentIndex].image}
                alt={cars[currentIndex].name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <div className="text-white">
                  <h3 className="text-3xl font-bold mb-2">{cars[currentIndex].name}</h3>
                  <p className="text-lg opacity-90">{cars[currentIndex].type}</p>
                  <p className="text-2xl font-bold mt-2">
                    From ${cars[currentIndex].price}/day
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={prevCar}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextCar}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarShowcase;
