
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";

const ListYourCar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <nav className="w-full px-4 py-6 flex justify-between items-center border-b">
          <h1 
            onClick={() => navigate("/")} 
            className="text-2xl font-bold text-primary cursor-pointer"
          >
            KARVO
          </h1>
          <Button 
            variant="ghost"
            onClick={() => navigate("/")}
          >
            Exit
          </Button>
        </nav>

        <main className="container max-w-4xl mx-auto py-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-center mb-8">
              List Your Car
            </h1>
            <div className="text-center text-lg text-muted-foreground mb-12">
              Let's get started with listing your car. We'll guide you through each step.
            </div>

            {/* Placeholder for the multi-step form */}
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-lg">Coming soon!</p>
                <p className="text-muted-foreground mt-2">
                  We're working on making this the best experience for you.
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </AuthGuard>
  );
};

export default ListYourCar;
