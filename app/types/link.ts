export interface Link {
	id: string
	slug: string
	targetUrl: string
	createdAt: string
	clicks: number
	lastClickedAt: string | null
}
