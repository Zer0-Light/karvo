
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import Footer from "@/components/Footer";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        navigate('/search');
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        navigate('/search');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLoginSuccess = () => {
    navigate("/search");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/db93a284-c1ab-484e-be12-8a5acbe8e74b.png" 
              alt="KARVO" 
              className="h-36 w-auto rounded cursor-pointer" 
              onClick={() => navigate("/")}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>Please sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm onSuccess={handleLoginSuccess} />

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <SocialLogin />

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <button 
                  type="button" 
                  onClick={() => navigate("/signup")} 
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
