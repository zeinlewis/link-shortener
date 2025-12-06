import { describe, it, expect, test } from "vitest"
import { getApiErrorMessage } from "../../app/utils/error"
import type { FetchError } from "ofetch"

describe("getApiErrorMessage", () => {
	describe("FetchError format", () => {
		// tests for error.data
		test("should extract statusMessage from FetchError.data", () => {
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

	describe("Direct response format", () => {
		// tests for direct error object
		it("should extract statusMessage from direct error object", () => {
			const error = { statusMessage: "Invalid URL" }

			const result = getApiErrorMessage(error)

			expect(result).toBe("Invalid URL")
		})

		it("should extract message from direct object", () => {
			const error = { message: "Server timeout" }

			const result = getApiErrorMessage(error)

			expect(result).toBe("Server timeout")
		})

		it("should return defaultMessage for empty object", () => {
			const error = {}

			const result = getApiErrorMessage(error)

			expect(result).toBe("An error occurred")
		})
	})

	describe("Edge cases", () => {
		// tests for unexpected formats
		it("should handle null", () => {
			const result = getApiErrorMessage(null)
			expect(result).toBe("An error occurred")
		})

		it("should handle undefined", () => {
			const result = getApiErrorMessage(undefined)
			expect(result).toBe("An error occurred")
		})

		it("should handle string instead of object", () => {
			const result = getApiErrorMessage("some string")

			expect(result).toBe("An error occurred")
		})

		test("should handle number instead of object", () => {
			const result = getApiErrorMessage(404)

			expect(result).toBe("An error occurred")
		})

		it("should use custom defaultMessage", () => {
			const result = getApiErrorMessage({}, "Custom error message")

			expect(result).toBe("Custom error message")
		})

		it("should use custom defaultMessage with invalid data", () => {
			const result = getApiErrorMessage(null, "Something went wrong")

			expect(result).toBe("Something went wrong")
		})
	})
})
