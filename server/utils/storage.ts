import type { Link } from "@/types/link"

const links: Link[] = []

export const storage = {
	addLink(link: Link) {
		links.push(link)
		return link
	},

	getLinks() {
		return links
	},

	getLinkBySlug(slug: string) {
		return links.find((l) => l.slug === slug)
	},

	incrementClicks(slug: string) {
		const link = links.find((l) => l.slug === slug)
		if (link) {
			link.clicks++
		}
	},
}
