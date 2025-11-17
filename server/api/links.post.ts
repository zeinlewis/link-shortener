import { customAlphabet } from 'nanoid'
import { storage } from '../utils/storage'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 6)

export default defineEventHandler(async (event) => {
	const { targetUrl } = await readBody(event)

	if (!targetUrl) {
		throw createError({
			statusCode: 400,
			statusMessage: "targetUrl is required",
		})
	}

	// URL validation
	try {
		new URL(targetUrl)
	} catch (e) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid URL",
		})
	}

	const link = {
		id: crypto.randomUUID(),
		slug: nanoid(),
		targetUrl,
		createdAt: new Date().toISOString(),
		clicks: 0,
	}

	storage.addLink(link)

	return link
})
