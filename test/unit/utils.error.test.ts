import { describe, it, expect } from "vitest"
import { getApiErrorMessage } from "../../app/utils/error"
import type { FetchError } from "ofetch"

describe("getApiErrorMessage", () => {
	describe("FetchError format", () => {
		// tests for error.data
		it("should extract statusMessage from FetchError.data", () => {
			const error: Partial<FetchError> = {
				data: { statusMessage: "Link not found" },
			}

			const result = getApiErrorMessage(error)

			expect(result).toBe("Link not found")
		})

		it("should extract message when statusMessage is missing", () => {
			const error: Partial<FetchError> = {
				data: { message: "Database error" },
			}

			const result = getApiErrorMessage(error)

			expect(result).toBe("Database error")
		})

		it("should prioritize statusMessage over message", () => {
			const error: Partial<FetchError> = {
				data: {
					statusMessage: "Status error",
					message: "Message error",
				},
			}

			const result = getApiErrorMessage(error)

			expect(result).toBe("Status error")
		})

		it("should return defaultMessage when FetchError.data is empty object", () => {
			const error: Partial<FetchError> = {
				data: {},
			}

			const result = getApiErrorMessage(error)

			expect(result).toBe("An error occurred")
		})
	})

	// describe("Direct response format", () => {
	// 	// tests for direct error object
	// })

	// describe("Edge cases", () => {
	// 	// tests for unexpected formats
	// })
})
