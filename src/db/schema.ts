import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const organizersTable = pgTable("organizers_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const organizersRelations = relations(organizersTable, ({ many }) => ({
  hackathons: many(hackathonsTable),
}));

export const hackathonsTable = pgTable("hackathons_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  organizerId: integer("organizer_id")
    .references(() => organizersTable.id, {
      onDelete: "cascade",
    })
    .notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const hackathonsRelations = relations(
  hackathonsTable,
  ({ one, many }) => ({
    organizer: one(organizersTable, {
      fields: [hackathonsTable.organizerId],
      references: [organizersTable.id],
    }),
    teams: many(teamsTable),
    projects: many(projectsTable),
  }),
);

export const teamsTable = pgTable("teams_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  hackathonId: integer("hackathon_id"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const teamsRelations = relations(teamsTable, ({ one, many }) => ({
  hackathon: one(hackathonsTable, {
    fields: [teamsTable.hackathonId],
    references: [hackathonsTable.id],
  }),
  members: many(profilesTable),
}));

export const profilesTable = pgTable("profiles_table", {
  userId: text("user_id").primaryKey(),
  name: text("name").notNull(),
  username: varchar("username", { length: 20 }).unique(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const profilesRelations = relations(profilesTable, ({ one }) => ({
  user: one(teamsTable, {
    fields: [profilesTable.userId],
    references: [teamsTable.id],
  }),
}));

export const projectsTable = pgTable("projects_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  githubUrl: text("github_url").notNull(),
  teamId: integer("team_id")
    .references(() => teamsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  hackathonId: integer("hackathon_id"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projectsRelations = relations(projectsTable, ({ one }) => ({
  team: one(teamsTable, {
    fields: [projectsTable.teamId],
    references: [teamsTable.id],
  }),
  hackathon: one(hackathonsTable, {
    fields: [projectsTable.hackathonId],
    references: [hackathonsTable.id],
  }),
}));
