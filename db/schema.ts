import { sqliteTable, text } from "drizzle-orm/sqlite-core";
export const profiles=sqliteTable("profiles",{
 id:text("id").primaryKey(), name:text("name").notNull(), campus:text("campus").notNull(), blood:text("blood").notNull(),
 allergies:text("allergies").notNull(), conditions:text("conditions").notNull(), medicalDetails:text("medical_details"), contactName:text("contact_name").notNull(), phone:text("phone").notNull(),createdAt:text("created_at").notNull(),
});
