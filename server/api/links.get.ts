import { db } from "../db/client"
import { linksTable } from "../db/schema"

export default defineEventHandler(async () => {
	const links = await db.select().from(linksTable)
	return links
})
