
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const ListingNavBar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="w-full px-4 py-6 flex justify-between items-center border-b">
      <div 
        onClick={() => navigate("/")} 
        className="cursor-pointer"
      >
        <img 
          src="/lovable-uploads/db93a284-c1ab-484e-be12-8a5acbe8e74b.png" 
          alt="KARVO" 
          className="h-8"
        />
      </div>
      <Button 
        variant="ghost"
        onClick={() => navigate("/")}
      >
        Exit
      </Button>
    </nav>
  );
};
