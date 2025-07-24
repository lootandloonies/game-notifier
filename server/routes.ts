import type { Express } from "express";
import { createServer, type Server } from "http";
import { gameService } from "./services/gameService";
import { gameFilterSchema, insertGameSchema } from "@shared/schema";
import { z } from "zod";
import { Router } from "express";
const router = Router();

router.get('/nightbot', (req, res) => {
  const freeGamesList = ['Game 1', 'Game 2', 'Game 3'];
  res.set('Content-Type', 'text/plain');
  res.send(`Free games right now: ${freeGamesList.join(', ')}`);
});

// Export router if not already done
export default router;
app.use(router);

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all games with optional filtering
  app.get("/api/games", async (req, res) => {
    try {
      // Extract and parse query parameters
      const {
        search,
        platforms,
        genre,
        minRating,
        sortBy,
        accessTypes
      } = req.query;

      // Build filter object with proper type handling
      const filterData: any = {};
      
      if (search && typeof search === 'string') {
        filterData.search = search;
      }
      
      if (platforms) {
        if (Array.isArray(platforms)) {
          filterData.platforms = platforms.filter(p => typeof p === 'string');
        } else if (typeof platforms === 'string') {
          filterData.platforms = [platforms];
        }
      }
      
      if (genre && typeof genre === 'string') {
        filterData.genre = genre;
      }
      
      if (minRating && typeof minRating === 'string') {
        const rating = parseFloat(minRating);
        if (!isNaN(rating)) {
          filterData.minRating = rating;
        }
      }
      
      if (sortBy && typeof sortBy === 'string') {
        filterData.sortBy = sortBy;
      }
      
      if (accessTypes) {
        if (Array.isArray(accessTypes)) {
          filterData.accessTypes = accessTypes;
        } else if (typeof accessTypes === 'string') {
          filterData.accessTypes = [accessTypes];
        }
      }
      
      console.log("Parsed filter data:", filterData);
      const filter = gameFilterSchema.parse(filterData);
      const games = await gameService.getFilteredGames(filter);
      res.json(games);
    } catch (error: any) {
      console.error("Error fetching games:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid filter parameters", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to fetch games" });
      }
    }
  });

  // Get a specific game by ID
  app.get("/api/games/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid game ID" });
      }

      const game = await gameService.getGameById(id);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }

      res.json(game);
    } catch (error) {
      console.error("Error fetching game:", error);
      res.status(500).json({ message: "Failed to fetch game" });
    }
  });

  // Create a new game (for admin use)
  app.post("/api/games", async (req, res) => {
    try {
      const gameData = insertGameSchema.parse(req.body);
      const game = await gameService.createGame(gameData);
      res.status(201).json(game);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid game data", errors: error.errors });
      }
      console.error("Error creating game:", error);
      res.status(500).json({ message: "Failed to create game" });
    }
  });

  // Update a game (for admin use)
  app.put("/api/games/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid game ID" });
      }

      const gameData = insertGameSchema.partial().parse(req.body);
      const game = await gameService.updateGame(id, gameData);
      
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }

      res.json(game);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid game data", errors: error.errors });
      }
      console.error("Error updating game:", error);
      res.status(500).json({ message: "Failed to update game" });
    }
  });

  // Delete a game (for admin use)
  app.delete("/api/games/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid game ID" });
      }

      const deleted = await gameService.deleteGame(id);
      if (!deleted) {
        return res.status(404).json({ message: "Game not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting game:", error);
      res.status(500).json({ message: "Failed to delete game" });
    }
  });

  // Refresh games from external APIs (for scheduled tasks)
  app.post("/api/games/refresh", async (req, res) => {
    try {
      await gameService.refreshGamesFromAPIs();
      res.json({ message: "Games refresh initiated" });
    } catch (error) {
      console.error("Error refreshing games:", error);
      res.status(500).json({ message: "Failed to refresh games" });
    }
  });

  // Get available platforms
  app.get("/api/platforms", async (req, res) => {
    try {
      const games = await gameService.getAllGames();
      const platforms = Array.from(new Set(games.map(game => game.platform)));
      res.json(platforms);
    } catch (error) {
      console.error("Error fetching platforms:", error);
      res.status(500).json({ message: "Failed to fetch platforms" });
    }
  });

  // Get available genres
  app.get("/api/genres", async (req, res) => {
    try {
      const games = await gameService.getAllGames();
      const genres = Array.from(new Set(games.map(game => game.genre).filter(Boolean)));
      res.json(genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
      res.status(500).json({ message: "Failed to fetch genres" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
