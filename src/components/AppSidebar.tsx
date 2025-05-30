
import { Home, Dumbbell, UtensilsCrossed, TrendingUp, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
    <Sidebar className="border-r border-white/10 bg-white/5 backdrop-blur-lg">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white drop-shadow-md">FitTrack</h1>
            <p className="text-sm text-blue-200">Welcome, Amsterdam</p>
          </div>
        </div>
        <SidebarTrigger className="mb-4 text-white hover:bg-white/10" />
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="mb-1"
                  >
                    <Link 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                        location.pathname === item.url 
                          ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-white border border-white/20 shadow-lg' 
                          : 'text-blue-100 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 sm:p-6">
        <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/10">
          <h4 className="font-semibold text-white mb-1">Premium features unlocked</h4>
          <p className="text-sm text-blue-200">Track unlimited workouts</p>
        </div>
        <Button variant="ghost" className="w-full justify-start gap-2 text-blue-200 hover:bg-white/10 hover:text-white">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
