import { storage } from "../utils/storage"

export default defineEventHandler(async () => {
	const links = storage.getLinks()
	return links
})
