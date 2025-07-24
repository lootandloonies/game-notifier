import { Gamepad, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Gamepad className="text-primary text-2xl" />
              <h1 className="text-xl font-bold text-foreground">Free Games Bot</h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Browse</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Platforms</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            </nav>
            <Button className="gaming-button-primary">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
          </div>

          <Button variant="ghost" className="md:hidden text-muted-foreground hover:text-primary">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
