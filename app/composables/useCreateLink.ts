import type { Link } from "@/types/link"

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
		} catch (err: any) {
			const errorMessage = err.data?.statusMessage || err.message || "Failed to create link"
			linksStore.setError(errorMessage)
			throw err
		} finally {
			loading.value = false
		}
	}

	return { createLink, loading }
}
