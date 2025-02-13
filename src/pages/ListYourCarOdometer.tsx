
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const ListYourCarOdometer = () => {
  const navigate = useNavigate();
  
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
            {/* Progress Section */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Step 3 of 11</span>
                <span>Vehicle Details</span>
              </div>
              <Progress value={27.27} className="h-2" />
            </div>

            <h1 className="text-3xl font-bold text-center mb-8">
              Vehicle Details
            </h1>
          </motion.div>
        </main>
      </div>
    </AuthGuard>
  );
};

export default ListYourCarOdometer;
