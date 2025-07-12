import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { User, LogOut, ChevronDown, ChevronUp } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { app } from "@/lib/firebase";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const auth = getAuth(app);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("You have been logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">RWI</span>
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Retail Waste Intelligence
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`text-sm font-bold transition-colors hover:text-primary ${isActive("/dashboard")
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:border-b-2 hover:border-muted-foreground/50"
                } py-1`}
            >
              Dashboard
            </Link>
            <Link
              to="/inventory"
              className={`text-sm font-bold transition-colors hover:text-primary ${isActive("/inventory")
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:border-b-2 hover:border-muted-foreground/50"
                } py-1`}
            >
              Inventory
            </Link>
            <Link
              to="/smart-pricing"
              className={`text-sm font-bold transition-colors hover:text-primary ${isActive("/smart-pricing")
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:border-b-2 hover:border-muted-foreground/50"
                } py-1`}
            >
              Smart Pricing
            </Link>
            <Link
              to="/ai-assistant"
              className={`text-sm font-bold transition-colors hover:text-primary ${isActive("/ai-assistant")
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:border-b-2 hover:border-muted-foreground/50"
                } py-1`}
            >
              AI Assistant
            </Link>
            <Link
              to="/redistribution"
              className={`text-sm font-bold transition-colors hover:text-primary ${isActive("/redistribution")
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:border-b-2 hover:border-muted-foreground/50"
                } py-1`}
            >
              Redistribution
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <DropdownMenu onOpenChange={setIsProfileOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full space-x-1"
                >
                  <User className="h-5 w-5" />
                  {isProfileOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};