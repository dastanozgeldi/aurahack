import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const organizers = pgTable("organizers_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const organizersRelations = relations(organizers, ({ many }) => ({
  hackathons: many(hackathons),
}));

export const hackathons = pgTable("hackathons_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  organizerId: integer("organizer_id")
    .references(() => organizers.id, {
      onDelete: "cascade",
    })
    .notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type SelectHackathon = typeof hackathons.$inferSelect;
export type InsertHackathon = typeof hackathons.$inferInsert;

export const hackathonsRelations = relations(hackathons, ({ one, many }) => ({
  organizer: one(organizers, {
    fields: [hackathons.organizerId],
    references: [organizers.id],
  }),
  teams: many(teams),
  projects: many(projects),
}));

export const teams = pgTable("teams_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  hackathonId: integer("hackathon_id"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const teamsRelations = relations(teams, ({ one, many }) => ({
  hackathon: one(hackathons, {
    fields: [teams.hackathonId],
    references: [hackathons.id],
  }),
  members: many(profiles),
}));

export const profiles = pgTable("profiles_table", {
  userId: text("user_id").primaryKey(),
  name: text("name").notNull(),
  username: varchar("username", { length: 20 }).unique(),
  teamId: integer("team_id"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type SelectProfile = typeof profiles.$inferSelect;
export type InsertProfile = typeof profiles.$inferInsert;

export const profilesRelations = relations(profiles, ({ one }) => ({
  team: one(teams, {
    fields: [profiles.teamId],
    references: [teams.id],
  }),
}));

export const projects = pgTable("projects_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  githubUrl: text("github_url").notNull(),
  loomUrl: text("loom_url"),
  teamId: integer("team_id")
    .references(() => teams.id, {
      onDelete: "cascade",
    })
    .notNull(),
  hackathonId: integer("hackathon_id"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  team: one(teams, {
    fields: [projects.teamId],
    references: [teams.id],
  }),
  hackathon: one(hackathons, {
    fields: [projects.hackathonId],
    references: [hackathons.id],
  }),
}));
