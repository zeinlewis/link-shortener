import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const linksTable = sqliteTable("links", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	slug: text("slug").notNull().unique(),
	targetUrl: text("target_url").notNull(),
	createdAt: text("created_at")
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
	clicks: integer("clicks").notNull().default(0),
	lastClickedAt: text("last_clicked_at"),
})

// Тип для TypeScript (автоматически генерируется из схемы)
export type Link = typeof linksTable.$inferSelect
export type InsertLink = typeof linksTable.$inferInsert
