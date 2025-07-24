import { Gamepad } from "lucide-react";
import { SiX, SiDiscord, SiReddit } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Gamepad className="text-primary text-2xl" />
              <h3 className="text-xl font-bold text-foreground">Free Games Bot</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Discover and claim free games from major gaming platforms. Never miss a free game opportunity again.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiX className="text-xl" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiDiscord className="text-xl" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiReddit className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-4">Platforms</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Epic Games Store</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Steam</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">GOG</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Ubisoft Connect</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Free Games Bot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
