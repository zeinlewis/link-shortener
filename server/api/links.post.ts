import { isValidUrl } from "@/utils/url"
import { customAlphabet } from "nanoid"
import { db } from "../db/client"
import { linksTable } from "../db/schema"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 6)

export default defineEventHandler(async (event) => {
	const { targetUrl } = await readBody(event)

	console.log("context db", event.context.db)

	if (!targetUrl) {
		throw createError({
			statusCode: 400,
			statusMessage: "targetUrl is required",
		})
	}

	// URL validation
	if (!isValidUrl(targetUrl)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid URL",
		})
	}

	const link: typeof linksTable.$inferInsert = {
		slug: nanoid(),
		targetUrl,
	}

	const [newLink] = await db.insert(linksTable).values(link).returning()

	return newLink
})
