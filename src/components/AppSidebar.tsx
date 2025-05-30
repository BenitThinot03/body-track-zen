
import { Home, Dumbbell, UtensilsCrossed, TrendingUp, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Workouts",
    url: "/workouts",
    icon: Dumbbell,
  },
  {
    title: "Nutrition",
    url: "/nutrition",
    icon: UtensilsCrossed,
  },
  {
    title: "Progress",
    url: "/progress",
    icon: TrendingUp,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-blue-100">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">FitTrack</h1>
            <p className="text-sm text-slate-500">Welcome, Amsterdam</p>
          </div>
        </div>
        <SidebarTrigger className="mb-4" />
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="mb-1"
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-6">
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-blue-900 mb-1">Premium features unlocked</h4>
          <p className="text-sm text-blue-700">Track unlimited workouts</p>
        </div>
        <Button variant="ghost" className="w-full justify-start gap-2 text-slate-600">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
