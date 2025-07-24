import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PLATFORMS, GENRES, RATING_OPTIONS } from "@/lib/types";
import type { FilterState } from "@/lib/types";

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    const newPlatforms = checked
      ? [...filters.platforms, platform]
      : filters.platforms.filter(p => p !== platform);
    onFiltersChange({ ...filters, platforms: newPlatforms });
  };

  const handleGenreChange = (genre: string) => {
    onFiltersChange({ ...filters, genre });
  };

  const handleRatingChange = (rating: string) => {
    onFiltersChange({ ...filters, minRating: rating });
  };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="gaming-surface rounded-xl p-6 sticky top-24">
        <h2 className="text-lg font-semibold mb-6 text-foreground">Filters</h2>
        
        {/* Search */}
        <div className="mb-6">
          <Label className="block text-sm font-medium text-muted-foreground mb-2">
            Search Games
          </Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search free games..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="gaming-input pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
        </div>

        {/* Platform Filter */}
        <div className="mb-6">
          <Label className="block text-sm font-medium text-muted-foreground mb-3">
            Platform
          </Label>
          <div className="space-y-2">
            {PLATFORMS.map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox
                  id={platform}
                  checked={filters.platforms.includes(platform)}
                  onCheckedChange={(checked) => 
                    handlePlatformChange(platform, checked as boolean)
                  }
                />
                <Label
                  htmlFor={platform}
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  {platform}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Genre Filter */}
        <div className="mb-6">
          <Label className="block text-sm font-medium text-muted-foreground mb-3">
            Genre
          </Label>
          <Select value={filters.genre} onValueChange={handleGenreChange}>
            <SelectTrigger className="gaming-input">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {GENRES.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <Label className="block text-sm font-medium text-muted-foreground mb-3">
            Minimum Rating
          </Label>
          <Select value={filters.minRating} onValueChange={handleRatingChange}>
            <SelectTrigger className="gaming-input">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              {RATING_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </aside>
  );
}
