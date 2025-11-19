import { storage } from "../../utils/storage"

export default defineEventHandler(async (event) => {
	const slug = getRouterParam(event, "slug")

	if (!slug) {
		throw createError({
			statusCode: 400,
			statusMessage: "Slug is required",
		})
	}

	const link = storage.getLinkBySlug(slug)

	if (!link) {
		throw createError({
			statusCode: 404,
			statusMessage: "Short link not found",
		})
	}

	storage.incrementClicks(slug)

	return link
})
