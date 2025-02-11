
import { Home, LogOut, Car, HelpCircle, Gift, Headphones, FileText, Shield, Search, Clock, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function AppSidebar() {
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
        name: 'Home',
        href: '/',
        icon: Home,
        onClick: () => navigate("/")
      },
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
        icon: LogOut,
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
      }
    ];
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <h2 className="text-2xl font-bold text-primary">KARVO</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        item.onClick();
                      }}
                      className="flex items-center gap-3 w-full"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
