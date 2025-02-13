
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const ListingNavBar = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};
