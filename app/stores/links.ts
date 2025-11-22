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

	// Getters
	const totalLinks = computed(() => links.value.length)

	const totalClicks = computed(() => links.value.reduce((sum, link) => sum + link.clicks, 0))

	const topLink = computed(() => {
		if (links.value.length === 0) {
			return null
		}
		return links.value.reduce((maxLink, link) => {
			return link.clicks > maxLink.clicks ? link : maxLink
		}, links.value[0] as Link)
	})

	return {
		// State
		links,
		error,

		// Setters
		replaceLinks,
		addLink,
		setError,
		clearError,

		// Getters
		totalLinks,
		totalClicks,
		topLink,
	}
})
