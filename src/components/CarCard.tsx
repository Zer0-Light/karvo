
import { Car, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type CarCardProps = {
  id: string;
  make: string;
  model: string;
  year: number;
  price_per_day: number;
  location: string;
  photos: string[] | null;
  description: string | null;
  isAuthenticated: boolean;
};

const CarCard = ({
  id,
  make,
  model,
  year,
  price_per_day,
  location,
  photos,
  description,
  isAuthenticated
}: CarCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to book this car.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    navigate(`/cars/${id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[16/9] relative overflow-hidden">
        <img
          src="/lovable-uploads/b1c6211a-f605-408b-9047-ce71ed5a3571.png"
          alt={`${make} ${model}`}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{`${year} ${make} ${model}`}</span>
          <span className="text-xl font-bold text-primary">${price_per_day}/day</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleClick}
        >
          {isAuthenticated ? "View Details" : "Log in to Book"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;

