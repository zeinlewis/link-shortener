export const useShortUrl = () => {
	const config = useRuntimeConfig()

	const getShortUrl = (slug: string) => {
		return `${config.public.baseUrl}/${slug}`
	}

	const copyLink = async (slug: string) => {
		if (!navigator?.clipboard) {
			throw new Error("Clipboard API not supported")
		}

		const shortUrl = getShortUrl(slug)
		await navigator.clipboard.writeText(shortUrl)
	}

	return {
		getShortUrl,
		copyLink,
	}
}
