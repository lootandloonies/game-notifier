import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FilterSidebar } from "@/components/filter-sidebar";
import { GameCard } from "@/components/game-card";
import type { Game } from "@shared/schema";
import type { FilterState, ViewState } from "@/lib/types";
import { SORT_OPTIONS } from "@/lib/types";

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    platforms: ["Epic Games", "Steam"],
    genre: "All Genres",
    minRating: "all",
    sortBy: "latest",
  });

  const [viewState, setViewState] = useState<ViewState>({
    isGridView: true,
    currentPage: 1,
    itemsPerPage: 12,
  });

  // Build query parameters for API call
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.platforms.length > 0) {
      filters.platforms.forEach(platform => params.append('platforms', platform));
    }
    if (filters.genre && filters.genre !== "All Genres") {
      params.append('genre', filters.genre);
    }
    if (filters.minRating && filters.minRating !== "all") params.append('minRating', filters.minRating);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    
    return params.toString();
  }, [filters]);

  const { data: games = [], isLoading, error } = useQuery<Game[]>({
    queryKey: ['/api/games', filters],
    queryFn: async () => {
      const url = `/api/games${queryParams ? `?${queryParams}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch games: ${response.status}`);
      }
      return response.json();
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  // Pagination logic
  const totalPages = Math.ceil(games.length / viewState.itemsPerPage);
  const startIndex = (viewState.currentPage - 1) * viewState.itemsPerPage;
  const paginatedGames = games.slice(startIndex, startIndex + viewState.itemsPerPage);

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const handleViewToggle = (isGrid: boolean) => {
    setViewState(prev => ({ ...prev, isGridView: isGrid }));
  };

  const handlePageChange = (page: number) => {
    setViewState(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Games</h2>
            <p className="text-muted-foreground">
              Failed to fetch games. Please try again later.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <FilterSidebar 
            filters={filters} 
            onFiltersChange={setFilters} 
          />

          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Free Games Available Now</h2>
                <p className="text-muted-foreground mt-1">
                  Showing {games.length} free games
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={filters.sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="gaming-input w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex bg-card rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewToggle(true)}
                    className={`p-2 rounded ${
                      viewState.isGridView 
                        ? 'text-primary bg-primary/20' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewToggle(false)}
                    className={`p-2 rounded ${
                      !viewState.isGridView 
                        ? 'text-primary bg-primary/20' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="gaming-surface rounded-xl overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-3 w-3/4 mb-4" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Game Cards Grid */}
            {!isLoading && (
              <>
                <div 
                  className={
                    viewState.isGridView 
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                      : "space-y-4"
                  }
                >
                  {paginatedGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>

                {/* Empty State */}
                {games.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No Games Found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to see more games.
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center mt-12">
                    <nav className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePageChange(viewState.currentPage - 1)}
                        disabled={viewState.currentPage === 1}
                        className="p-2 text-muted-foreground disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <Button
                            key={pageNum}
                            variant={pageNum === viewState.currentPage ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handlePageChange(pageNum)}
                            className={
                              pageNum === viewState.currentPage
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-primary"
                            }
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                      
                      {totalPages > 5 && (
                        <>
                          <span className="px-2 text-muted-foreground">...</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePageChange(totalPages)}
                            className="text-muted-foreground hover:text-primary"
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePageChange(viewState.currentPage + 1)}
                        disabled={viewState.currentPage === totalPages}
                        className="p-2 text-muted-foreground disabled:opacity-50"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
