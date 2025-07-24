import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  platform: text("platform").notNull(), // Epic Games, Steam, GOG, etc.
  rating: real("rating"), // 0-10 rating
  genre: text("genre"),
  originalPrice: real("original_price"),
  claimUrl: text("claim_url").notNull(),
  endDate: timestamp("end_date"),
  isFree: boolean("is_free").default(true),
  requiresSubscription: text("requires_subscription"), // null = completely free, "Prime Gaming", "Game Pass", etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

// Filter types for frontend
export const gameFilterSchema = z.object({
  search: z.string().optional(),
  platforms: z.array(z.string()).optional(),
  genre: z.string().optional(),
  minRating: z.number().optional(),
  sortBy: z.enum(["latest", "rating", "name", "endDate"]).optional(),
  accessTypes: z.array(z.string()).optional(),
});

export type GameFilter = z.infer<typeof gameFilterSchema>;
