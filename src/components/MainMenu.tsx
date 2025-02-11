
import React from 'react';
import { Menu, LogOut, Car, HelpCircle, Gift, Headphones, FileText, Shield, Wrench, Calculator, Search, Clock, MessageSquare } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const MainMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again.",
      });
    } else {
      toast({
        title: "Success",
        description: "You have been logged out successfully.",
      });
      navigate("/");
    }
  };

  const getMenuItems = () => {
    const items = [
      { 
        name: isAuthenticated ? 'Log out' : 'Log in', 
        href: '#', 
        icon: LogOut,
        onClick: isAuthenticated ? handleLogout : () => navigate("/login")
      },
    ];

    if (!isAuthenticated) {
      items.push({ 
        name: 'Sign up', 
        href: '/signup', 
        icon: Menu,
        onClick: () => navigate("/signup")
      });
    }

    return [
      ...items,
      { 
        name: 'Search Rentals', 
        href: '/search', 
        icon: Search,
        onClick: () => navigate("/search")
      },
      { 
        name: 'My Trips', 
        href: '/trips', 
        icon: Clock,
        onClick: () => navigate("/trips")
      },
      { 
        name: 'Messages', 
        href: '/inbox', 
        icon: MessageSquare,
        onClick: () => navigate("/inbox")
      },
      { 
        name: 'Become a host', 
        href: '/become-host', 
        icon: Car,
        onClick: () => navigate("/become-host")
      },
      { 
        name: 'How Karvo works', 
        href: '#', 
        icon: HelpCircle,
        onClick: () => {}
      },
      { 
        name: 'Gift cards', 
        href: '#', 
        icon: Gift,
        onClick: () => {}
      },
      { 
        name: 'Contact support', 
        href: '#', 
        icon: Headphones,
        onClick: () => {}
      },
      { 
        name: 'Legal', 
        href: '#', 
        icon: FileText,
        onClick: () => {}
      },
      { 
        name: 'Insurance & protection', 
        href: '#', 
        icon: Shield,
        onClick: () => {}
      },
      { 
        name: 'Host tools', 
        href: '#', 
        icon: Wrench,
        onClick: () => {}
      },
      { 
        name: 'Calculator', 
        href: '#', 
        icon: Calculator,
        onClick: () => {}
      },
    ];
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur-sm">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] h-[60vh] mt-4 rounded-xl" style={{ backgroundColor: 'white' }}>
          <nav className="flex flex-col space-y-4">
            {getMenuItems().map((item, index) => (
              <React.Fragment key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    item.onClick();
                  }}
                  className="flex items-center gap-3 text-lg hover:text-primary transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
                {index === (isAuthenticated ? 0 : 1) && <Separator className="my-4" />}
              </React.Fragment>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MainMenu;
