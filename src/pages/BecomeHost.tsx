
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BecomeHost = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-0 w-full px-4 py-6 flex justify-between items-center z-50">
        <h1 
          onClick={() => navigate("/")} 
          className="text-3xl font-bold text-primary cursor-pointer"
        >
          KARVO
        </h1>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/login")}
            className="bg-white hover:bg-accent/10"
          >
            Sign in
          </Button>
          <Button 
            onClick={() => navigate("/signup")}
            className="bg-accent hover:bg-accent/90"
          >
            Sign up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Start earning with your car
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Turn your car into a second income by sharing it on KARVO
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/signup")}
              className="bg-accent hover:bg-accent/90 text-lg px-8 py-6"
            >
              List your car
            </Button>
          </div>
        </motion.div>
        
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/lovable-uploads/09957f3f-713e-4d24-9c6f-b3e8f135dc3e.png"
            alt="Luxury car"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      </section>

      {/* Host Image Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-xl overflow-hidden"
          >
            <img
              src="/lovable-uploads/696fe045-3239-4eca-aa75-69f290828404.png"
              alt="KARVO car host"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
              <p className="text-white text-xl md:text-2xl font-medium">
                Join our community of successful car hosts
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16">
            Why share your car on KARVO?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6"
            >
              <div className="text-accent text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">Earn Extra Income</h3>
              <p className="text-gray-600">Turn your car into a money-making asset when you're not using it</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="text-accent text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3">Insurance Coverage</h3>
              <p className="text-gray-600">Your car is protected with comprehensive insurance coverage</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center p-6"
            >
              <div className="text-accent text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Flexible Schedule</h3>
              <p className="text-gray-600">You're in control - share your car whenever it suits you</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeHost;
