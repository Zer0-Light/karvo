
import React from 'react';
import { Menu, LogIn, UserPlus, Car, HelpCircle, Gift, Headphones, FileText, Shield, Wrench, Calculator } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const MainMenu = () => {
  const menuItems = [
    { name: 'Log in', href: '#', icon: LogIn },
    { name: 'Sign up', href: '#', icon: UserPlus },
    { name: 'Become a host', href: '#', icon: Car },
    { name: 'How Karvo works', href: '#', icon: HelpCircle },
    { name: 'Gift cards', href: '#', icon: Gift },
    { name: 'Contact support', href: '#', icon: Headphones },
    { name: 'Legal', href: '#', icon: FileText },
    { name: 'Insurance & protection', href: '#', icon: Shield },
    { name: 'Host tools', href: '#', icon: Wrench },
    { name: 'Calculator', href: '#', icon: Calculator },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur-sm">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] h-[90vh] mt-4 rounded-xl" style={{ backgroundColor: 'white' }}>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <Separator className="my-4" />
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 text-lg hover:text-primary transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MainMenu;
