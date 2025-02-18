
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Car, ArrowRight } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";

const ListYourCarCongrats = () => {
  const navigate = useNavigate();
  const { carId } = useParams();

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const sparkleVariants = {
    initial: { scale: 0, rotate: 0 },
    animate: {
      scale: [0, 1.2, 1],
      rotate: [0, 45, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -30, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Sparkles className="w-8 h-8 text-accent/30" />
            </motion.div>
          ))}
        </div>

        <main className="relative container max-w-4xl mx-auto py-12 px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-8"
          >
            <motion.div
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
              className="inline-block"
            >
              <Car className="w-24 h-24 mx-auto text-accent mb-8" />
            </motion.div>

            <motion.h1
              variants={textVariants}
              className="text-6xl md:text-7xl font-bold text-primary bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            >
              Awesome!
            </motion.h1>

            <motion.div
              variants={textVariants}
              className="space-y-4"
            >
              <h2 className="text-3xl font-semibold text-gray-800">
                Your Car is Listed!
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Congratulations! Your car is now live on Karvo. Get ready to start earning and sharing your vehicle with the community.
              </p>
            </motion.div>

            <motion.div
              variants={textVariants}
              className="pt-8"
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-accent hover:bg-accent/90"
                onClick={() => navigate(`/cars/${carId}`)}
              >
                View Your Listing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </AuthGuard>
  );
};

export default ListYourCarCongrats;
