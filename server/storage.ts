import { games, type Game, type InsertGame } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // Game storage methods
  getAllGames(): Promise<Game[]>;
  getGameById(id: number): Promise<Game | undefined>;
  createGame(game: InsertGame): Promise<Game>;
  updateGame(id: number, game: Partial<InsertGame>): Promise<Game | undefined>;
  deleteGame(id: number): Promise<boolean>;
  getGamesByFilter(filter: {
    search?: string;
    platforms?: string[];
    genre?: string;
    minRating?: number;
    sortBy?: string;
  }): Promise<Game[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any> = new Map();
  private games: Map<number, Game> = new Map();
  private currentUserId: number = 1;
  private currentGameId: number = 1;

  constructor() {
    // Initialize with some sample games for development
    this.seedGames();
  }

  private seedGames() {
    const sampleGames: InsertGame[] = [
      {
        title: "Control Ultimate Edition",
        description: "A supernatural third-person action-adventure game with mind-bending abilities and shifting environments.",
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        platform: "Epic Games",
        rating: 8.7,
        genre: "Action",
        originalPrice: 39.99,
        claimUrl: "https://store.epicgames.com/en-US/p/control",
        endDate: new Date("2025-08-15"),
        isFree: true,
      },
      {
        title: "Cities: Skylines",
        description: "Modern take on the classic city simulation. Build the city of your dreams and manage complex urban systems.",
        imageUrl: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        platform: "Steam",
        rating: 9.2,
        genre: "Simulation",
        originalPrice: 29.99,
        claimUrl: "https://store.steampowered.com/app/255710/Cities_Skylines/",
        endDate: new Date("2025-08-10"),
        isFree: true,
      },
      {
        title: "Metro Exodus",
        description: "Post-apocalyptic first-person shooter with immersive story and survival elements in a devastated world.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        platform: "Epic Games",
        rating: 8.4,
        genre: "FPS",
        originalPrice: 59.99,
        claimUrl: "https://store.epicgames.com/en-US/p/metro-exodus",
        endDate: new Date("2025-08-20"),
        isFree: true,
      },
      {
        title: "A Plague Tale: Innocence",
        description: "Heart-wrenching adventure following siblings through plague-ridden medieval France with stealth gameplay.",
        imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        platform: "Epic Games",
        rating: 8.9,
        genre: "Adventure",
        originalPrice: 44.99,
        claimUrl: "https://store.epicgames.com/en-US/p/a-plague-tale-innocence",
        endDate: new Date("2025-08-25"),
        isFree: true,
      },
      {
        title: "Subnautica",
        description: "Underwater adventure survival game with exploration, crafting, and mysterious oceanic creatures.",
        imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        platform: "Steam",
        rating: 9.1,
        genre: "Survival",
        originalPrice: 24.99,
        claimUrl: "https://store.steampowered.com/app/264710/Subnautica/",
        endDate: new Date("2025-08-05"),
        isFree: true,
      },
      {
        title: "Among Us",
        description: "Social deduction party game where crewmates work together while trying to identify impostors among them.",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        platform: "Steam",
        rating: 7.8,
        genre: "Party",
        originalPrice: 4.99,
        claimUrl: "https://store.steampowered.com/app/945360/Among_Us/",
        endDate: new Date("2025-07-31"),
        isFree: true,
      },
    ];

    sampleGames.forEach(game => {
      this.createGame(game);
    });
  }

  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllGames(): Promise<Game[]> {
    return Array.from(this.games.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getGameById(id: number): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const id = this.currentGameId++;
    const now = new Date();
    const game: Game = {
      ...insertGame,
      id,
      genre: insertGame.genre ?? null,
      rating: insertGame.rating ?? null,
      originalPrice: insertGame.originalPrice ?? null,
      endDate: insertGame.endDate ?? null,
      isFree: insertGame.isFree ?? true,
      createdAt: now,
      updatedAt: now,
    };
    this.games.set(id, game);
    return game;
  }

  async updateGame(id: number, updateData: Partial<InsertGame>): Promise<Game | undefined> {
    const existingGame = this.games.get(id);
    if (!existingGame) return undefined;

    const updatedGame: Game = {
      ...existingGame,
      ...updateData,
      updatedAt: new Date(),
    };
    
    this.games.set(id, updatedGame);
    return updatedGame;
  }

  async deleteGame(id: number): Promise<boolean> {
    return this.games.delete(id);
  }

  async getGamesByFilter(filter: {
    search?: string;
    platforms?: string[];
    genre?: string;
    minRating?: number;
    sortBy?: string;
  }): Promise<Game[]> {
    let games = Array.from(this.games.values());

    // Apply search filter
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      games = games.filter(game => 
        game.title.toLowerCase().includes(searchTerm) ||
        game.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply platform filter
    if (filter.platforms && filter.platforms.length > 0) {
      games = games.filter(game => filter.platforms!.includes(game.platform));
    }

    // Apply genre filter
    if (filter.genre && filter.genre !== "All Genres") {
      games = games.filter(game => game.genre === filter.genre);
    }

    // Apply rating filter
    if (filter.minRating) {
      games = games.filter(game => game.rating && game.rating >= filter.minRating!);
    }

    // Apply sorting
    switch (filter.sortBy) {
      case "rating":
        games.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "name":
        games.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "endDate":
        games.sort((a, b) => {
          if (!a.endDate && !b.endDate) return 0;
          if (!a.endDate) return 1;
          if (!b.endDate) return -1;
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        });
        break;
      default: // "latest"
        games.sort((a, b) => 
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
    }

    return games;
  }
}

export const storage = new MemStorage();
