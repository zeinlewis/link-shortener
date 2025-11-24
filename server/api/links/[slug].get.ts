import { eq } from "drizzle-orm"
import { db } from "../../db/client"
import { linksTable } from "../../db/schema"

export default defineEventHandler(async (event) => {
	const slug = getRouterParam(event, "slug")

	if (!slug) {
		throw createError({
			statusCode: 400,
			statusMessage: "Slug is required",
		})
	}

	const rows = await db.select().from(linksTable).where(eq(linksTable.slug, slug)).limit(1)

	const link = rows[0]

	if (!link) {
		throw createError({
			statusCode: 404,
			statusMessage: "Short link not found",
		})
	}

	// Update click statistics
	db.update(linksTable)
		.set({
			clicks: link.clicks + 1,
		})
		.where(eq(linksTable.slug, slug))
		.execute()

	return link
})
