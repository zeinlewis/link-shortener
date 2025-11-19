import type { Link } from "@/types/link"
import { defineStore } from "pinia"

export const useLinksStore = defineStore("links", () => {
	// State
	const links = ref<Link[]>([])
	const error = ref<string | null>(null)

	// Setter
	const addLink = (newLink: Link) => {
		links.value.unshift(newLink)
	}

	const replaceLinks = (newLinks: Link[]) => {
		links.value = newLinks
	}

	const setError = (message: string) => {
		error.value = message
	}

	const clearError = () => {
		error.value = null
	}

	return {
		// State
		links,
		error,

		// Setters
		replaceLinks,
		addLink,
		setError,
		clearError,
	}
})
