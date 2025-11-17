import type { Link } from "@/types/link"
import { defineStore } from "pinia"

interface CreateLinkPayload {
	targetUrl: string
}

export const useLinksStore = defineStore("links", () => {
	// State
	const links = ref<Link[]>([])
	const loading = ref(false)
	const error = ref<string | null>(null)

	// Actions
	const createLink = async (payload: CreateLinkPayload) => {
		loading.value = true
		error.value = null

		try {
			const newLink = await $fetch<Link>("/api/links", {
				method: "POST",
				body: payload,
			})

			links.value.push(newLink)
			return newLink
		} catch (err: any) {
			error.value = err.data?.statusMessage || err.message || "Failed to create link"
			throw err
		} finally {
			loading.value = false
		}
	}

	const fetchLinks = async () => {
		loading.value = true
		error.value = null

		try {
			const fetchedLinks = await $fetch<Link[]>("/api/links")
			links.value = fetchedLinks
		} catch (err: any) {
			error.value = err.data?.statusMessage || err.message || "Failed to fetch links"
			throw err
		} finally {
			loading.value = false
		}
	}

	const clearError = () => {
		error.value = null
	}

	return {
		// State
		links,
		loading,
		error,

		// Actions
		createLink,
		fetchLinks,
		clearError,
	}
})
