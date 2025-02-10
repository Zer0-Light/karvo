
import { 
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Car, Menu, Gift, Headset, FileText, Shield, Wrench, Calculator } from "lucide-react";

const menuItems = [
  {
    title: "Become a host",
    icon: Car,
    href: "#"
  },
  {
    title: "How Karvo works",
    icon: Menu,
    href: "#"
  },
  {
    title: "Gift cards",
    icon: Gift,
    href: "#"
  },
  {
    title: "Contact support",
    icon: Headset,
    href: "#"
  },
  {
    title: "Legal",
    icon: FileText,
    href: "#"
  },
  {
    title: "Insurance & protection",
    icon: Shield,
    href: "#"
  },
  {
    title: "Host tools",
    icon: Wrench,
    href: "#"
  },
  {
    title: "Carculator",
    icon: Calculator,
    href: "#"
  }
];

const Navigation = () => {
  return (
    <SidebarProvider>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="p-2 hover:bg-gray-100 rounded-full">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <Button variant="ghost" className="text-primary hover:bg-primary/5">
              Become a Host
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-primary">KARVO</h1>
        </div>
      </div>

      <Sidebar>
        <SidebarContent className="w-[250px] max-w-[80vw] pt-16">
          <div className="flex flex-col space-y-2 p-3">
            <div className="space-y-3 mb-4">
              <Button variant="ghost" className="w-full justify-start text-base">Log in</Button>
              <Button variant="ghost" className="w-full justify-start text-base">Sign up</Button>
            </div>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-gray-700 hover:text-primary text-sm py-2"
                  asChild
                >
                  <a href={item.href}>
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default Navigation;
