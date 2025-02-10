
import { Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";
import { Button } from "./ui/button";

const MainSidebar = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Trigger Button */}
        <div className="fixed top-8 right-8 z-50">
          <SidebarTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarTrigger>
        </div>

        {/* Sidebar Content */}
        <Sidebar className="right-0 border-l">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#" className="flex items-center gap-2">
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#" className="flex items-center gap-2">
                        <span>About</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#" className="flex items-center gap-2">
                        <span>Contact</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
};

export default MainSidebar;
