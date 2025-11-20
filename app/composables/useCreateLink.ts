import type { Link } from "@/types/link"
import { getApiErrorMessage } from "@/utils/error"

interface CreateLinkPayload {
	targetUrl: string
}

export const useCreateLink = () => {
	const linksStore = useLinksStore()
	const loading = ref(false)

	const createLink = async (payload: CreateLinkPayload) => {
		loading.value = true
		linksStore.clearError()

		try {
			const newLink = await $fetch<Link>("/api/links", {
				method: "POST",
				body: payload,
			})

			linksStore.addLink(newLink)
			return newLink
		} catch (err) {
			const errorMessage = getApiErrorMessage(err, "Failed to create link")
			linksStore.setError(errorMessage)
			throw err
		} finally {
			loading.value = false
		}
	}

	return { createLink, loading }
}
