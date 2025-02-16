
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VehicleValue = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', carId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const handleContinue = async () => {
    try {
      // Update car status to available when continuing
      const { error } = await supabase
        .from('cars')
        .update({ status: 'available' })
        .eq('id', carId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your car has been listed successfully!",
      });

      // Navigate to the car profile
      navigate(`/cars/${carId}`);
    } catch (error) {
      console.error('Error listing car:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to list your car. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Car not found</h1>
        <Button onClick={() => navigate("/list-your-car")}>Back to Listing</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Final Step: Vehicle Value</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Estimated Value</h2>
                <span className="text-2xl font-bold">
                  ${car.vehicle_value?.toLocaleString() ?? 'N/A'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span>Vehicle value assessment complete</span>
                </div>

                {!car.vehicle_value && (
                  <div className="flex items-center gap-2 text-yellow-600">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Value assessment pending</span>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  This value helps us determine insurance coverage and protection for your vehicle. 
                  By continuing, you agree to list your car on KARVO.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={handleContinue}
            >
              List My Car
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleValue;
