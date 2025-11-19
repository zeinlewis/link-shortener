import type { Link } from "@/types/link"

export const useFetchLinks = () => {
	const linksStore = useLinksStore()

	const { data, pending, error, refresh } = useFetch<Link[]>("/api/links", {
		key: "links",
		onResponse({ response }) {
			if (response._data) {
				linksStore.replaceLinks(response._data)
			}
		},
		onResponseError({ response }) {
			// Используем optional chaining и type assertion
			const errorMessage = (response._data as any)?.statusMessage || "Failed to fetch links"
			linksStore.setError(errorMessage)
		},
	})

	return { links: data, pending, error, refresh }
}
