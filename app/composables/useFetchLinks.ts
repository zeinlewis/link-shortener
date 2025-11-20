import type { Link } from "@/types/link"
import { getApiErrorMessage } from "@/utils/error"

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
			const errorMessage = getApiErrorMessage(response._data, "Failed to fetch links")
			linksStore.setError(errorMessage)
		},
	})

	return { links: data, pending, error, refresh }
}
