import { Download, Info, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Game } from "@shared/schema";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const formatEndDate = (date: Date | string | null) => {
    if (!date) return "No end date";
    const endDate = new Date(date);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Ends today";
    if (diffDays === 1) return "Ends tomorrow";
    return `Ends in ${diffDays} days`;
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = (rating % 2) >= 1;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex text-yellow-400">
        {Array(fullStars).fill(0).map((_, i) => (
          <Star key={`full-${i}`} className="h-3 w-3 fill-current" />
        ))}
        {hasHalfStar && <StarHalf className="h-3 w-3 fill-current" />}
        {Array(emptyStars).fill(0).map((_, i) => (
          <Star key={`empty-${i}`} className="h-3 w-3" />
        ))}
      </div>
    );
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "epic games":
        return "bg-primary text-primary-foreground";
      case "steam":
        return "bg-blue-600 text-white";
      case "gog":
        return "bg-purple-600 text-white";
      case "ubisoft connect":
        return "bg-orange-600 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const handleClaimGame = () => {
    window.open(game.claimUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="gaming-card">
      <img 
        src={game.imageUrl} 
        alt={`${game.title} game cover`}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Badge className="bg-accent text-accent-foreground text-xs font-bold">
              {game.requiresSubscription ? game.requiresSubscription : "FREE"}
            </Badge>
            {game.requiresSubscription && (
              <Badge className="bg-orange-600 text-white text-xs">
                Subscription
              </Badge>
            )}
          </div>
          <Badge className={`text-xs ${getPlatformColor(game.platform)}`}>
            {game.platform}
          </Badge>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {game.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {game.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {renderStars(game.rating)}
            {game.rating && (
              <span className="text-muted-foreground text-sm">
                {game.rating.toFixed(1)}
              </span>
            )}
          </div>
          <span className="text-muted-foreground text-xs">
            {formatEndDate(game.endDate)}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={handleClaimGame}
            className="flex-1 gaming-button-primary"
          >
            <Download className="mr-2 h-4 w-4" />
            Claim Game
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="p-2 bg-muted hover:bg-muted/80"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
