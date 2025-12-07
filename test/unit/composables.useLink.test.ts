import { describe, it, expect, vi, beforeEach } from "vitest"
import { useLink } from "@/composables/useLink"

vi.mock("#app", () => ({
	useRuntimeConfig: vi.fn(),
}))

describe("useLink", () => {
	let mockClipboard: { writeText: ReturnType<typeof vi.fn> }

	beforeEach(() => {
		// Setup before each test
		mockClipboard = {
			writeText: vi.fn(),
		}

		Object.assign(navigator, {
			clipboard: mockClipboard,
		})
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe("getShortUrl", () => {
		it("should generate URL with baseURL from config", async () => {
			// Arrange: config with baseURL
			const { useRuntimeConfig } = await import("#app")

			vi.mocked(useRuntimeConfig).mockReturnValue({
				public: {
					baseUrl: "https://short.link",
				},
			})

			// Act: call getShortUrl
			const { getShortUrl } = useLink()
			const result = getShortUrl("abc123")

			// Assert: check the result
			expect(result).toBe("https://short.link/abc123")
		})
	})

	describe("copyLink", () => {})
})
